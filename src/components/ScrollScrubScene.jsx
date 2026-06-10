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

const optimizedVideoSource = (src) => {
  if (!src?.endsWith(".mp4") || !isBrowser) return src;

  return src.replace(/\.mp4$/i, "-scrub-1080.mp4");
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
  const progressBarRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [pinState, setPinState] = useState("before");

  const mediaSources = useMemo(() => {
    const derived = mediaSourcesFrom(place?.video || mp4Src || webmSrc || movSrc);
    const optimizedMp4 = optimizedVideoSource(mp4Src || derived.mp4);

    return {
      mov: movSrc || derived.mov,
      optimizedMp4,
      mp4: optimizedMp4,
      fallbackMp4: mp4Src || derived.mp4,
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
    setIsTouch(coarsePointerRef.current);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    metadataReadyRef.current = false;
    targetTimeRef.current = 0;
    displayedTimeRef.current = 0;
    lastSeekAtRef.current = 0;
    lastProgressRef.current = -1;
    setProgress(0);
    setVideoFailed(false);

    const updateTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const rawProgress = scrollableDistance <= 0 ? 0 : -rect.top / scrollableDistance;
      const nextProgress = clamp(rawProgress, 0, 1);
      const nextPinState = rect.top > 0 ? "before" : rect.bottom <= window.innerHeight ? "after" : "active";

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${nextProgress})`;
      }

      if (Math.abs(nextProgress - lastProgressRef.current) > 0.01) {
        lastProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      setPinState((current) => (current === nextPinState ? current : nextPinState));

      if (metadataReadyRef.current && Number.isFinite(video.duration) && video.duration > 0) {
        targetTimeRef.current = nextProgress * video.duration;
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
      if (metadataReadyRef.current && !prefersReducedMotionRef.current) {
        const isCoarse = coarsePointerRef.current;
        const lerpAmount = isCoarse ? 0.08 : 0.12;
        const minSeekInterval = isCoarse ? 95 : 48;
        const seekThreshold = isCoarse ? 0.12 : 0.055;
        const nextTime = lerp(displayedTimeRef.current, targetTimeRef.current, lerpAmount);

        displayedTimeRef.current = nextTime;

        if (
          now - lastSeekAtRef.current >= minSeekInterval &&
          Math.abs(video.currentTime - nextTime) > seekThreshold &&
          !video.seeking
        ) {
          lastSeekAtRef.current = now;
          seekVideo(nextTime);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      metadataReadyRef.current = true;
      video.pause();
      video.currentTime = 0;
      displayedTimeRef.current = 0;
      updateTargetFromScroll();
    };

    const handleError = () => {
      setVideoFailed(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);
    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", updateTargetFromScroll);

    video.load();
    updateTargetFromScroll();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", updateTargetFromScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [mediaSources.mov, mediaSources.mp4, mediaSources.webm]);

  const textureClass = place?.texture || "water";
  const poster = posterSrc || place?.image;
  const label = place?.name
    ? `${place.name} scroll kontrollü sahnesi`
    : "Scroll kontrollü Amasya sahnesi";

  return (
    <section
      className={`scrub-section ${textureClass} ${children ? "has-content" : ""} is-${pinState} ${className}`.trim()}
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

        {!videoFailed && (
          <video
            key={mediaSources.optimizedMp4 || mediaSources.fallbackMp4 || mediaSources.mov || mediaSources.webm}
            className="scrub-video"
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={poster}
            onError={() => setVideoFailed(true)}
          >
            {mediaSources.mov && <source src={mediaSources.mov} type="video/quicktime" />}
            {mediaSources.optimizedMp4 && <source src={mediaSources.optimizedMp4} type="video/mp4" />}
            {mediaSources.fallbackMp4 && mediaSources.fallbackMp4 !== mediaSources.optimizedMp4 && (
              <source src={mediaSources.fallbackMp4} type="video/mp4" />
            )}
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
