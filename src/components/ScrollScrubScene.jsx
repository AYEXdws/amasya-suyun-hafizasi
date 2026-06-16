import { useEffect, useMemo, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + (end - start) * amount;
const mediaSourcesFrom = (src) => {
  const fallbackBase = "/assets/videos/kral-kaya-hero";
  const cleanSrc = src || `${fallbackBase}.mov`;
  const [pathPart, suffixPart = ""] = cleanSrc.split(/([?#].*)/);
  const suffix = suffixPart || "";
  const base = pathPart.replace(/\.(mov|mp4|webm)$/i, "");

  return {
    mov: pathPart.endsWith(".mov") ? cleanSrc : null,
    mp4: pathPart.endsWith(".mp4") ? cleanSrc : `${base}.mp4${suffix}`,
    webm: pathPart.endsWith(".webm") ? cleanSrc : `${base}.webm${suffix}`,
  };
};

const optimizedVideoSource = (src) => {
  return src;
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
  const pendingSeekTimeRef = useRef(null);
  const lastForcedSeekAtRef = useRef(0);
  const progressBarRef = useRef(null);
  const viewportHeightRef = useRef(0);
  const viewportWidthRef = useRef(0);
  const prefersReducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [pinState, setPinState] = useState("before");
  const [useMobileVideo, setUseMobileVideo] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isScrubReady, setIsScrubReady] = useState(false);

  const mediaSources = useMemo(() => {
    const activePlaceVideo = useMobileVideo && place?.mobileVideo ? place.mobileVideo : place?.video;
    const derived = mediaSourcesFrom(activePlaceVideo || mp4Src || webmSrc || movSrc);
    const optimizedMp4 = optimizedVideoSource(mp4Src || derived.mp4);

    return {
      mov: movSrc || derived.mov,
      optimizedMp4,
      mp4: optimizedMp4,
      fallbackScrubMp4: null,
      fallbackMp4: mp4Src || derived.mp4,
      webm: webmSrc || derived.webm,
    };
  }, [movSrc, mp4Src, place?.mobileVideo, place?.video, useMobileVideo, webmSrc]);

  const activeCaption = useMemo(
    () => captions.find((caption) => progress >= caption.start && progress <= caption.end),
    [captions, progress]
  );

  const remoteSrc = useMemo(
    () => mediaSources.optimizedMp4 || mediaSources.fallbackMp4 || mediaSources.mov || mediaSources.webm || "",
    [mediaSources.fallbackMp4, mediaSources.mov, mediaSources.optimizedMp4, mediaSources.webm]
  );

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const mobileVideoQuery = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const syncMobileVideo = () => setUseMobileVideo(mobileVideoQuery.matches);

    coarsePointerRef.current = coarseQuery.matches;
    viewportHeightRef.current = Math.round(window.visualViewport?.height || window.innerHeight);
    viewportWidthRef.current = window.innerWidth;
    setIsTouch(coarsePointerRef.current);
    syncMobileVideo();

    mobileVideoQuery.addEventListener("change", syncMobileVideo);
    return () => mobileVideoQuery.removeEventListener("change", syncMobileVideo);
  }, []);

  useEffect(() => {
    metadataReadyRef.current = false;
    targetTimeRef.current = 0;
    displayedTimeRef.current = 0;
    lastSeekAtRef.current = 0;
    lastProgressRef.current = -1;
    pendingSeekTimeRef.current = null;
    lastForcedSeekAtRef.current = 0;
    setProgress(0);
    setVideoFailed(false);

    if (!remoteSrc) {
      setIsPreparing(false);
      setIsScrubReady(true);
      return undefined;
    }

    setIsPreparing(true);
    setIsScrubReady(false);

    return undefined;
  }, [remoteSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    metadataReadyRef.current = false;
    targetTimeRef.current = 0;
    displayedTimeRef.current = 0;
    lastSeekAtRef.current = 0;
    lastProgressRef.current = -1;
    pendingSeekTimeRef.current = null;
    lastForcedSeekAtRef.current = 0;
    setProgress(0);
    setVideoFailed(false);

    const getStableViewportHeight = () => viewportHeightRef.current || window.innerHeight;

    const updateStableViewport = () => {
      const nextWidth = window.innerWidth;
      if (Math.abs(nextWidth - viewportWidthRef.current) > 32) {
        viewportWidthRef.current = nextWidth;
        viewportHeightRef.current = Math.round(window.visualViewport?.height || window.innerHeight);
      }
    };

    const updateTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = getStableViewportHeight();
      const scrollableDistance = section.offsetHeight - viewportHeight;
      const rawProgress = scrollableDistance <= 0 ? 0 : -rect.top / scrollableDistance;
      const nextProgress = clamp(rawProgress, 0, 1);
      const nextPinState = rect.top > 0 ? "before" : rect.bottom <= viewportHeight ? "after" : "active";

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

    const seekVideo = (time, force = false) => {
      if (!metadataReadyRef.current) return;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const safeTime = duration > 0 ? clamp(time, 0, duration) : Math.max(0, time);

      if (video.seeking && !force) {
        pendingSeekTimeRef.current = safeTime;
        return;
      }

      pendingSeekTimeRef.current = null;
      try {
        lastForcedSeekAtRef.current = performance.now();
        if (typeof video.fastSeek === "function" && Math.abs(video.currentTime - safeTime) > 0.65) {
          video.fastSeek(safeTime);
        } else {
          video.currentTime = safeTime;
        }
      } catch {
        pendingSeekTimeRef.current = safeTime;
      }
    };

    const animate = (now = 0) => {
      if (metadataReadyRef.current && !prefersReducedMotionRef.current) {
        const isCoarse = coarsePointerRef.current;
        const lerpAmount = isCoarse ? 0.2 : 0.15;
        const minSeekInterval = isCoarse ? 58 : 46;
        const seekThreshold = isCoarse ? 0.045 : 0.05;
        const nextTime = lerp(displayedTimeRef.current, targetTimeRef.current, lerpAmount);
        const pendingTime = pendingSeekTimeRef.current;

        displayedTimeRef.current = nextTime;

        if (
          video.seeking &&
          pendingTime != null &&
          now - lastForcedSeekAtRef.current > 420
        ) {
          seekVideo(pendingTime, true);
        }

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

    const markReady = () => {
      metadataReadyRef.current = true;
      setIsPreparing(false);
      setIsScrubReady(true);
      video.pause();
    };

    const handleLoadedMetadata = () => {
      video.pause();
      if (video.currentTime !== 0) {
        try {
          video.currentTime = 0;
        } catch {
          pendingSeekTimeRef.current = 0;
        }
      }
      displayedTimeRef.current = 0;
    };

    const handleReady = () => {
      markReady();
      if (targetTimeRef.current === 0 && video.currentTime !== 0) {
        seekVideo(0, true);
      }
      updateTargetFromScroll();
    };

    const handleSeeked = () => {
      const pendingTime = pendingSeekTimeRef.current;
      if (pendingTime == null) return;
      pendingSeekTimeRef.current = null;
      if (Math.abs(video.currentTime - pendingTime) > 0.04) {
        seekVideo(pendingTime, true);
      }
    };

    const handleError = () => {
      setVideoFailed(true);
      setIsPreparing(false);
      setIsScrubReady(true);
    };

    const handleResize = () => {
      updateStableViewport();
      updateTargetFromScroll();
    };

    const resyncAfterLifecycleChange = () => {
      updateStableViewport();

      if (video.readyState >= 2) {
        markReady();
      } else if (!video.error) {
        metadataReadyRef.current = false;
        setIsPreparing(true);
        setIsScrubReady(false);
        video.load();
      }

      updateTargetFromScroll();
      displayedTimeRef.current = video.currentTime || targetTimeRef.current || 0;
      if (metadataReadyRef.current) {
        seekVideo(targetTimeRef.current, true);
      }
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        resyncAfterLifecycleChange();
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);
    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("focus", resyncAfterLifecycleChange);
    window.addEventListener("pageshow", resyncAfterLifecycleChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.visualViewport?.addEventListener("resize", handleResize);

    video.load();
    updateTargetFromScroll();
    frameRef.current = requestAnimationFrame(animate);

    const hydrateCachedReadyState = () => {
      if (video.readyState >= 2) {
        markReady();
        updateTargetFromScroll();
        seekVideo(targetTimeRef.current, true);
      } else if (video.readyState >= 1) {
        handleLoadedMetadata();
      }
    };

    requestAnimationFrame(hydrateCachedReadyState);
    window.setTimeout(hydrateCachedReadyState, 240);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("focus", resyncAfterLifecycleChange);
      window.removeEventListener("pageshow", resyncAfterLifecycleChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.visualViewport?.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [remoteSrc]);

  const textureClass = place?.texture || "water";
  const poster = posterSrc || place?.image;
  const label = place?.name
    ? `${place.name} scroll kontrollü sahnesi`
    : "Scroll kontrollü Amasya sahnesi";

  return (
    <section
      className={`scrub-section ${textureClass} ${children ? "has-content" : ""} ${isPreparing || !isScrubReady ? "is-loading" : ""} is-${pinState} ${className}`.trim()}
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
            key={remoteSrc}
            className={`scrub-video ${isScrubReady ? "is-ready" : ""}`.trim()}
            ref={videoRef}
            src={remoteSrc || undefined}
            muted
            playsInline
            preload="auto"
            poster={poster}
            style={{ opacity: isScrubReady ? 1 : 0 }}
            onError={() => setVideoFailed(true)}
          />
        )}

        {(!isScrubReady || videoFailed) && <div className="scrub-placeholder" aria-hidden="true" />}

        <div className="scrub-overlay" aria-hidden="true" />
        {place?.ambientSound && (
          <audio src={place.ambientSound} preload="none" aria-label={`${place.name} ortam sesi`} />
        )}
        <div className="scrub-hint">
          {isPreparing || !isScrubReady
            ? hintLabels?.loading || "Video hazırlanıyor"
            : isTouch
              ? hintLabels?.touch || "Parmağını yavaşça kaydır"
              : hintLabels?.desktop || "Yavaşça kaydır"}
        </div>
        <div className="scrub-progress" ref={progressBarRef} style={{ transform: `scaleX(${progress})` }} />
        {activeCaption?.text && (
          <div className="scrub-caption" key={activeCaption.text}>
            {activeCaption.text}
          </div>
        )}
        {children && (isScrubReady || videoFailed) && <div className="scrub-content">{children}</div>}
      </div>
    </section>
  );
}
