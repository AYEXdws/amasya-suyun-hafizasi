import { useEffect, useMemo, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + (end - start) * amount;
const isBrowser = typeof window !== "undefined";

const mediaSourcesFrom = (src) => {
  const fallbackBase = "/assets/videos/kral-kaya-hero";
  const cleanSrc = src || `${fallbackBase}.mov`;
  const base = cleanSrc.replace(/\.(mov|mp4|webm)$/i, "");

  return {
    mov: cleanSrc.endsWith(".mov") ? cleanSrc : null,
    mp4: cleanSrc.endsWith(".mp4") ? cleanSrc : `${base}.mp4`,
    webm: cleanSrc.endsWith(".webm") ? cleanSrc : `${base}.webm`,
  };
};

const optimizedVideoSources = (src) => {
  if (!src?.endsWith(".mp4") || !isBrowser) return src ? [src] : [];

  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.matchMedia("(max-width: 760px)").matches;

  if (hasCoarsePointer || narrowViewport) {
    return [
      src.replace(/\.mp4$/i, "-mobile-v2.mp4"),
      src.replace(/\.mp4$/i, "-mobile.mp4"),
      src,
    ];
  }

  return [src.replace(/\.mp4$/i, "-scrub-1080.mp4"), src];
};

export default function ScrollScrubScene({
  place,
  captions = [],
  children,
  movSrc,
  mp4Src,
  webmSrc,
  posterSrc,
  className = "",
  hintLabels,
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const metadataReadyRef = useRef(false);
  const targetTimeRef = useRef(0);
  const displayedTimeRef = useRef(0);
  const lastSeekAtRef = useRef(0);
  const lastProgressRef = useRef(-1);
  const lastIssuedTimeRef = useRef(-1);
  const progressBarRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const passivePlaybackRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isPassivePlayback, setIsPassivePlayback] = useState(false);
  const [pinState, setPinState] = useState("before");
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const mediaSources = useMemo(() => {
    const derived = mediaSourcesFrom(place?.video || mp4Src || webmSrc || movSrc);
    const optimizedMp4s = optimizedVideoSources(mp4Src || derived.mp4);
    const mp4s = [...optimizedMp4s, mp4Src || derived.mp4].filter(
      (source, index, sources) => source && sources.indexOf(source) === index
    );

    return {
      mov: movSrc || derived.mov,
      optimizedMp4s: mp4s,
      webm: webmSrc || derived.webm,
    };
  }, [movSrc, mp4Src, place?.video, webmSrc]);

  const activeCaption = useMemo(
    () => captions.find((caption) => progress >= caption.start && progress <= caption.end),
    [captions, progress]
  );

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    coarsePointerRef.current = window.matchMedia("(pointer: coarse)").matches;
    passivePlaybackRef.current = prefersReducedMotionRef.current;
    setIsTouch(coarsePointerRef.current);
    setIsPassivePlayback(passivePlaybackRef.current);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const updatePinState = () => {
      const rect = section.getBoundingClientRect();
      const nextPinState = rect.top > 0 ? "before" : rect.bottom <= window.innerHeight ? "after" : "active";
      setPinState((current) => (current === nextPinState ? current : nextPinState));
    };

    if (prefersReducedMotionRef.current) {
      updatePinState();
      window.addEventListener("scroll", updatePinState, { passive: true });
      window.addEventListener("resize", updatePinState);

      return () => {
        window.removeEventListener("scroll", updatePinState);
        window.removeEventListener("resize", updatePinState);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: coarsePointerRef.current ? "450px 0px" : "900px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(section);
    updatePinState();
    window.addEventListener("scroll", updatePinState, { passive: true });
    window.addEventListener("resize", updatePinState);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updatePinState);
      window.removeEventListener("resize", updatePinState);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return undefined;

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    metadataReadyRef.current = false;
    targetTimeRef.current = 0;
    displayedTimeRef.current = 0;
    lastSeekAtRef.current = 0;
    lastProgressRef.current = -1;
    lastIssuedTimeRef.current = -1;
    setProgress(0);
    setVideoFailed(false);
    setIsVideoReady(false);

    const updateTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const rawProgress = scrollableDistance <= 0 ? 0 : -rect.top / scrollableDistance;
      const nextProgress = clamp(rawProgress, 0, 1);
      const nextPinState = rect.top > 0 ? "before" : rect.bottom <= window.innerHeight ? "after" : "active";

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${nextProgress})`;
      }

      if (captions.length > 0 && Math.abs(nextProgress - lastProgressRef.current) > 0.02) {
        lastProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      setPinState((current) => (current === nextPinState ? current : nextPinState));

      if (
        !passivePlaybackRef.current &&
        metadataReadyRef.current &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const rawTarget = nextProgress * video.duration;
        const timeStep = coarsePointerRef.current ? 1 / 15 : 0.045;
        targetTimeRef.current = Math.round(rawTarget / timeStep) * timeStep;
      }
    };

    const seekVideo = (time) => {
      if (typeof video.fastSeek === "function" && Math.abs(video.currentTime - time) > 0.55) {
        video.fastSeek(time);
        return;
      }

      video.currentTime = time;
    };

    const animate = (now = 0) => {
      if (metadataReadyRef.current && !passivePlaybackRef.current) {
        const isCoarse = coarsePointerRef.current;
        const lerpAmount = 0.12;
        const minSeekInterval = isCoarse ? 72 : 48;
        const seekThreshold = isCoarse ? 1 / 20 : 0.055;
        const nextTime = isCoarse
          ? targetTimeRef.current
          : lerp(displayedTimeRef.current, targetTimeRef.current, lerpAmount);

        displayedTimeRef.current = nextTime;

        if (
          now - lastSeekAtRef.current >= minSeekInterval &&
          Math.abs(video.currentTime - nextTime) > seekThreshold &&
          Math.abs(lastIssuedTimeRef.current - nextTime) > seekThreshold &&
          !video.seeking
        ) {
          lastSeekAtRef.current = now;
          lastIssuedTimeRef.current = nextTime;
          seekVideo(nextTime);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      metadataReadyRef.current = true;
      displayedTimeRef.current = 0;
      lastIssuedTimeRef.current = -1;
      setIsVideoReady(true);
      updateTargetFromScroll();

      if (passivePlaybackRef.current) {
        video.play().catch(() => {
          video.controls = false;
        });
        return;
      }

      video.pause();
      video.currentTime = 0;
    };

    const handleError = () => {
      setIsVideoReady(false);
      setVideoFailed(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);
    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", updateTargetFromScroll);

    video.load();
    updateTargetFromScroll();
    if (!passivePlaybackRef.current) {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", updateTargetFromScroll);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [captions.length, mediaSources.mov, mediaSources.optimizedMp4s, mediaSources.webm, shouldLoadVideo]);

  const textureClass = place?.texture || "water";
  const poster = posterSrc || place?.image;
  const label = place?.name
    ? `${place.name} scroll kontrollü sahnesi`
    : "Scroll kontrollü Amasya sahnesi";

  return (
    <section
      className={`scrub-section ${textureClass} ${children ? "has-content" : ""} ${
        isPassivePlayback ? "is-passive" : "is-scrubbing"
      } ${isVideoReady ? "has-video-ready" : ""} is-${pinState} ${className}`.trim()}
      ref={sectionRef}
      aria-label={label}
    >
      <div className="scrub-sticky">
        {poster && (
          <img
            className="scrub-poster"
            src={poster}
            alt=""
            aria-hidden="true"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
        )}

        {shouldLoadVideo && !videoFailed && (
          <video
            key={mediaSources.optimizedMp4s.join("|") || mediaSources.mov || mediaSources.webm}
            className="scrub-video"
            ref={videoRef}
            muted
            playsInline
            autoPlay={isPassivePlayback}
            loop={isPassivePlayback}
            preload="metadata"
            poster={poster}
            onError={() => setVideoFailed(true)}
          >
            {mediaSources.mov && <source src={mediaSources.mov} type="video/quicktime" />}
            {mediaSources.optimizedMp4s.map((source) => (
              <source key={source} src={source} type="video/mp4" />
            ))}
            {mediaSources.webm && <source src={mediaSources.webm} type="video/webm" />}
          </video>
        )}

        {videoFailed && <div className="scrub-placeholder" aria-hidden="true" />}

        <div className="scrub-overlay" aria-hidden="true" />
        {place?.ambientSound && (
          <audio src={place.ambientSound} preload="none" aria-label={`${place.name} ortam sesi`} />
        )}
        <div className="scrub-hint">
          {isTouch ? hintLabels?.touch || "Parmaginla ilerlet" : hintLabels?.desktop || "Kaydirarak ilerle"}
        </div>
        <div className="scrub-progress" ref={progressBarRef} style={{ transform: `scaleX(${progress})` }} />
        {activeCaption?.text && (
          <div className="scrub-caption" key={activeCaption.text}>
            {activeCaption.text}
          </div>
        )}
        {children && <div className="scrub-content">{children}</div>}
      </div>
    </section>
  );
}
