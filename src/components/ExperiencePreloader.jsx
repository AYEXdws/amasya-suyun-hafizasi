import { useEffect, useMemo, useState } from "react";
import { mediaPath } from "../data/media";
import { heroAssets } from "../data/stops";
import { places } from "../data/story";

const preloadVersion = "amasya-media-preloaded-v1";
const isBrowser = typeof window !== "undefined";

const preferredVideoSource = (video) => {
  if (!video?.endsWith(".mp4") || !isBrowser) return video;

  const mobile =
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 760px)").matches;

  return video.replace(/\.mp4$/i, mobile ? "-mobile-v2.mp4" : "-scrub-1080.mp4");
};

const fileLabel = (url) => {
  try {
    const file = decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
    return file.replace(/-(mobile-v2|scrub-1080)\.mp4$/i, "").replace(/-/g, " ");
  } catch {
    return "Amasya sahnesi";
  }
};

const readPreloadState = () => {
  try {
    return sessionStorage.getItem(preloadVersion);
  } catch {
    return null;
  }
};

const writePreloadState = () => {
  try {
    sessionStorage.setItem(preloadVersion, "done");
  } catch {
    // Storage can be unavailable in strict/private browser modes.
  }
};

async function preloadVideo(url, onChunk, signal) {
  const response = await fetch(url, {
    cache: "force-cache",
    mode: "cors",
    signal,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }

  if (!response.body) {
    await response.arrayBuffer();
    onChunk(1);
    return;
  }

  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(value?.byteLength || 0);
  }
}

export default function ExperiencePreloader({ onReady }) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState("Amasya");
  const [loadedMb, setLoadedMb] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  const videos = useMemo(() => {
    const baseVideos = [
      heroAssets.heroVideo,
      mediaPath("videos", "manzara-yavas-cekim.mp4"),
      ...places.map((place) => place.video),
    ].filter(Boolean);

    return [...new Set(baseVideos.map(preferredVideoSource).filter(Boolean))];
  }, []);

  useEffect(() => {
    if (!videos.length) {
      onReady();
      return undefined;
    }

    if (readPreloadState() === "done") {
      onReady();
      return undefined;
    }

    const controller = new AbortController();
    const skipTimer = window.setTimeout(() => setCanSkip(true), 5000);

    const run = async () => {
      let loadedBytes = 0;

      for (let index = 0; index < videos.length; index += 1) {
        const url = videos[index];
        setCurrent(fileLabel(url));

        try {
          await preloadVideo(url, (bytes) => {
            if (controller.signal.aborted) return;
            loadedBytes += bytes;
            setLoadedMb(Math.round(loadedBytes / 1024 / 1024));
          }, controller.signal);
        } catch {
          // Do not trap the visitor on the loading screen. The video element still has fallbacks.
        }

        if (controller.signal.aborted) return;
        setProgress(Math.round(((index + 1) / videos.length) * 100));
      }

      writePreloadState();
      onReady();
    };

    run();

    return () => {
      window.clearTimeout(skipTimer);
      controller.abort();
    };
  }, [onReady, videos]);

  return (
    <main className="experience-preloader" aria-live="polite">
      <div className="preloader-grain" aria-hidden="true" />
      <section className="preloader-panel">
        <p className="preloader-kicker">Amasya hazırlanıyor</p>
        <h1>Önce sahneleri yüklüyoruz.</h1>
        <p>
          Video yolculuğu eksiksiz aksın diye görüntüleri baştan indiriyoruz.
          Biraz bekle; sonra şehir kesintisiz açılacak.
        </p>
        <div className="preloader-meter" aria-label={`Yukleme yuzdesi ${progress}`}>
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="preloader-status">
          <span>{progress}%</span>
          <span>{current}</span>
          <span>{loadedMb} MB</span>
        </div>
        {canSkip && (
          <button type="button" className="preloader-skip" onClick={onReady}>
            Beklemeden gir
          </button>
        )}
      </section>
    </main>
  );
}
