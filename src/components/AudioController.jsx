import { useEffect, useRef, useState } from "react";

export default function AudioController({ src, labels }) {
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    setEnabled(false);
    setAvailable(false);

    if (!src) return undefined;

    fetch(src, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        if (!ignore) setAvailable(response.ok);
      })
      .catch(() => {
        if (!ignore) setAvailable(false);
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    if (enabled) {
      audio.play().catch(() => setEnabled(false));
    }
  }, [enabled, src]);

  if (!src || !available) return null;

  return (
    <div className="audio-control">
      <audio ref={audioRef} src={src} preload="none" loop />
      <button type="button" onClick={() => setEnabled((current) => !current)}>
        <span aria-hidden="true">{enabled ? "♪" : "○"}</span>
        {enabled ? labels.disable : labels.enable}
      </button>
    </div>
  );
}
