const localMediaBase = "/assets";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const mediaBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_MEDIA_BASE_URL || localMediaBase
);

export const mediaPath = (type, fileName) => {
  return `${mediaBaseUrl}/${type}/${encodeURIComponent(fileName)}`;
};

export const mediaAssetPath = (...segments) => {
  return `${mediaBaseUrl}/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
};
