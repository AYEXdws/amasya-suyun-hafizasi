const localMediaBase = "/assets";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const mediaBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_MEDIA_BASE_URL || localMediaBase
);

export const mediaPath = (type, fileName) => {
  return `${mediaBaseUrl}/${type}/${encodeURIComponent(fileName)}`;
};
