const localMediaBase = "/assets";
const mediaVersion = import.meta.env.VITE_MEDIA_VERSION || "2026-06-14-route-ready";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const mediaBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_MEDIA_BASE_URL || localMediaBase
);

export const withMediaVersion = (url) => {
  if (!mediaVersion || !url) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${encodeURIComponent(mediaVersion)}`;
};

export const mediaPath = (type, fileName) => {
  return withMediaVersion(`${mediaBaseUrl}/${type}/${encodeURIComponent(fileName)}`);
};

export const mediaAssetPath = (...segments) => {
  return `${mediaBaseUrl}/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
};
