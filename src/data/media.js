const localMediaBase = "/assets";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const cloudinaryVideoMap = {
  "amasya-kalesi.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689006/amasya-kalesi_qa7tqy.mp4",
  "bayezid-kulliyesi.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689006/bayezid-kulliyesi_wlt7d1.mp4",
  "amasya-ustcekim-hızlı.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689014/amasya-ustcekim-h%C4%B1zl%C4%B1_dv2a8q.mp4",
  "cınematık-karısık-manzara-amasya.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689045/c%C4%B1nemat%C4%B1k-kar%C4%B1s%C4%B1k-manzara-amasya_euzuuv.mp4",
  "yaliboyu.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689080/yaliboyu_mjw1lc.mp4",
  "yesilirmak.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689092/yesilirmak_l3szal.mp4",
  "kral-kaya.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689077/kral-kaya_kfjcon.mp4",
  "kral-kaya-1.30dk-yavas-cekim.mp4":
    "https://res.cloudinary.com/dsttkiydr/video/upload/v1780689077/kral-kaya_kfjcon.mp4",
};

export const mediaBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_MEDIA_BASE_URL || localMediaBase
);

export const mediaPath = (type, fileName) => {
  if (type === "videos" && cloudinaryVideoMap[fileName]) {
    return cloudinaryVideoMap[fileName];
  }

  return `${mediaBaseUrl}/${type}/${encodeURIComponent(fileName)}`;
};
