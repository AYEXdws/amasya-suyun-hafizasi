import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const padFrame = (index) => String(index + 1).padStart(4, "0");
const decodedFrameWindow = 10;

export default function FrameScrubScene({
  frameBaseUrl,
  frameCount,
  frameExtension = "jpg",
  posterSrc,
  className = "",
  hintLabels,
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progressBarRef = useRef(null);
  const framesRef = useRef(new Map());
  const loadingRef = useRef(new Map());
  const currentIndexRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const stableHeightRef = useRef(0);
  const stableWidthRef = useRef(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pinState, setPinState] = useState("before");
  const [isReady, setIsReady] = useState(false);

  const frameUrl = useCallback(
    (index) => `${frameBaseUrl}/${padFrame(index)}.${frameExtension}`,
    [frameBaseUrl, frameExtension]
  );

  const drawImageCover = useCallback((image) => {
    const canvas = canvasRef.current;
    if (!canvas || !image?.complete) return;

    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * pixelRatio));
    const height = Math.max(1, Math.round(rect.height * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }, []);

  const drawNearestFrame = useCallback(
    (targetIndex) => {
      const exact = framesRef.current.get(targetIndex);
      if (exact) {
        lastDrawnIndexRef.current = targetIndex;
        drawImageCover(exact);
        return;
      }

      let nearestIndex = lastDrawnIndexRef.current;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const index of framesRef.current.keys()) {
        const distance = Math.abs(index - targetIndex);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      }

      const nearest = framesRef.current.get(nearestIndex);
      if (nearest) {
        lastDrawnIndexRef.current = nearestIndex;
        drawImageCover(nearest);
      }
    },
    [drawImageCover]
  );

  const pruneDecodedFrames = useCallback((centerIndex) => {
    for (const index of framesRef.current.keys()) {
      if (Math.abs(index - centerIndex) > decodedFrameWindow) {
        framesRef.current.delete(index);
      }
    }
  }, []);

  const loadFrame = useCallback(
    (index) => {
      const safeIndex = clamp(index, 0, frameCount - 1);
      if (framesRef.current.has(safeIndex)) {
        return Promise.resolve(framesRef.current.get(safeIndex));
      }
      if (loadingRef.current.has(safeIndex)) {
        return loadingRef.current.get(safeIndex);
      }

      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.loading = "eager";
        image.crossOrigin = "anonymous";
        image.onload = () => {
          framesRef.current.set(safeIndex, image);
          loadingRef.current.delete(safeIndex);
          if (safeIndex === currentIndexRef.current) {
            setIsReady(true);
            drawImageCover(image);
          }
          pruneDecodedFrames(currentIndexRef.current);
          resolve(image);
        };
        image.onerror = () => {
          loadingRef.current.delete(safeIndex);
          reject(new Error(`Frame failed: ${safeIndex}`));
        };
        image.src = frameUrl(safeIndex);
      });

      loadingRef.current.set(safeIndex, promise);
      return promise;
    },
    [drawImageCover, frameCount, frameUrl, pruneDecodedFrames]
  );

  const warmFrameCache = useCallback(
    async (index) => {
      const safeIndex = clamp(index, 0, frameCount - 1);
      if (framesRef.current.has(safeIndex) || loadingRef.current.has(safeIndex)) return;

      try {
        const response = await fetch(frameUrl(safeIndex), {
          cache: "force-cache",
          mode: "cors",
        });
        await response.blob();
      } catch {
        // Cache warming is opportunistic; direct image loading still handles the frame.
      }
    },
    [frameCount, frameUrl]
  );

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    stableHeightRef.current = Math.round(window.visualViewport?.height || window.innerHeight);
    stableWidthRef.current = window.innerWidth;

    const initialLoads = Array.from({ length: Math.min(frameCount, 8) }, (_, index) =>
      loadFrame(index)
    );
    Promise.allSettled(initialLoads).then(() => {
      drawNearestFrame(currentIndexRef.current);
      setIsReady(framesRef.current.size > 0);
    });

    let cancelled = false;
    const preloadAll = async () => {
      const concurrency = 4;
      let next = 8;

      const worker = async () => {
        while (!cancelled && next < frameCount) {
          const index = next;
          next += 1;
          await warmFrameCache(index);
        }
      };

      await Promise.all(Array.from({ length: concurrency }, worker));
    };

    preloadAll();

    return () => {
      cancelled = true;
    };
  }, [drawNearestFrame, frameCount, loadFrame, warmFrameCache]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const stableHeight = () => stableHeightRef.current || window.innerHeight;

    const updateStableViewport = () => {
      const nextWidth = window.innerWidth;
      if (Math.abs(nextWidth - stableWidthRef.current) > 32) {
        stableWidthRef.current = nextWidth;
        stableHeightRef.current = Math.round(window.visualViewport?.height || window.innerHeight);
      }
    };

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = stableHeight();
      const scrollableDistance = section.offsetHeight - viewportHeight;
      const progress = clamp(scrollableDistance <= 0 ? 0 : -rect.top / scrollableDistance, 0, 1);
      const targetIndex = clamp(Math.round(progress * (frameCount - 1)), 0, frameCount - 1);
      const nextPinState = rect.top > 0 ? "before" : rect.bottom <= viewportHeight ? "after" : "active";

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      setPinState((current) => (current === nextPinState ? current : nextPinState));

      if (targetIndex !== currentIndexRef.current) {
        currentIndexRef.current = targetIndex;
        loadFrame(targetIndex).catch(() => undefined);
        loadFrame(targetIndex + 1).catch(() => undefined);
        loadFrame(targetIndex - 1).catch(() => undefined);
        loadFrame(targetIndex + 2).catch(() => undefined);
        loadFrame(targetIndex - 2).catch(() => undefined);
        pruneDecodedFrames(targetIndex);
      }

      drawNearestFrame(targetIndex);
    };

    const handleResize = () => {
      updateStableViewport();
      drawNearestFrame(currentIndexRef.current);
      updateFromScroll();
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawNearestFrame, frameCount, loadFrame, pruneDecodedFrames]);

  return (
    <section
      className={`frame-scrub-section ${isReady ? "is-ready" : ""} is-${pinState} ${className}`.trim()}
      ref={sectionRef}
      aria-label="Kare kontrollü Amasya sahnesi"
    >
      <div className="frame-scrub-sticky">
        {posterSrc && <img className="frame-scrub-poster" src={posterSrc} alt="" aria-hidden="true" />}
        <canvas className="frame-scrub-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="frame-scrub-overlay" aria-hidden="true" />
        <div className="scrub-hint">
          {isTouch ? hintLabels?.touch || "Parmağını yavaşça kaydır" : hintLabels?.desktop || "Yavaşça kaydır"}
        </div>
        <div className="scrub-progress" ref={progressBarRef} />
      </div>
    </section>
  );
}
