import { useEffect, useMemo, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + (end - start) * amount;

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
  const prefersReducedMotionRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [pinState, setPinState] = useState("before");

  const mediaSources = useMemo(() => {
    const derived = mediaSourcesFrom(place?.video || mp4Src || webmSrc || movSrc);
    return {
      mov: movSrc || derived.mov,
      mp4: mp4Src || derived.mp4,
      webm: webmSrc || derived.webm,
    };
  }, [movSrc, mp4Src, place?.video, webmSrc]);

  const activeCaption = useMemo(
    () => captions.find((caption) => progress >= caption.start && progress <= caption.end),
    [captions, progress]
  );

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    metadataReadyRef.current = false;
    targetTimeRef.current = 0;
    displayedTimeRef.current = 0;
    setProgress(0);
    setVideoFailed(false);

    const updateTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const rawProgress = scrollableDistance <= 0 ? 0 : -rect.top / scrollableDistance;
      const nextProgress = clamp(rawProgress, 0, 1);
      setProgress(nextProgress);
      setPinState(rect.top > 0 ? "before" : rect.bottom <= window.innerHeight ? "after" : "active");

      if (metadataReadyRef.current && Number.isFinite(video.duration) && video.duration > 0) {
        targetTimeRef.current = nextProgress * video.duration;
      }
    };

    const animate = () => {
      if (metadataReadyRef.current && !prefersReducedMotionRef.current) {
        const nextTime = lerp(displayedTimeRef.current, targetTimeRef.current, 0.12);
        displayedTimeRef.current = nextTime;

        if (Math.abs(video.currentTime - nextTime) > 0.025) {
          video.currentTime = nextTime;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      metadataReadyRef.current = true;
      video.pause();
      video.currentTime = 0;
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
            key={mediaSources.mp4 || mediaSources.mov || mediaSources.webm}
            className="scrub-video"
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={poster}
            onError={() => setVideoFailed(true)}
          >
            {mediaSources.mov && <source src={mediaSources.mov} type="video/quicktime" />}
            {mediaSources.mp4 && <source src={mediaSources.mp4} type="video/mp4" />}
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
        <div className="scrub-progress" style={{ transform: `scaleX(${progress})` }} />
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
