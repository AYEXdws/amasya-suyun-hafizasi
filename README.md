# Amasya — Suyun Hafızası

Amasya'yı Yeşilırmak kıyısından tarihî sokaklara, kaya mezarlarından kaleye uzanan bir yolculukla anlatan görsel web deneyimi.

Fotoğraf, video, kaydırmayla ilerleyen sahneler ve keşif rotaları aynı anlatı içinde birleşir. Mevcut uygulama Türkçe çalışır.

## Deneyim

- Karşılama ekranı ve şehir hikâyesi.
- `/hikaye` üzerinden başlayan sıralı gezi rotası.
- `/rota/:id` adreslerinde mekâna özel anlatılar.
- `/kesfet` üzerinden durakların bağımsız incelenmesi.
- `/final` ekranında ziyaret edilen durakların özeti.
- Mobil medyaya uyarlanan sahneler, ses kontrolü ve video yüklenemediğinde görsel yedekleri.

İçerik; Yeşilırmak, Yalıboyu, II. Bayezid Külliyesi, Kral Kaya Mezarları, Harşena, Amasya Kalesi, Boraboy ve Ferhat ile Şirin gibi durakları kapsar. Yolculuk seçimi React state'inde tutulur; kalıcı kullanıcı hesabı veya rezervasyon sistemi bulunmaz.

## Teknoloji ve yapı

React, React Router, Framer Motion ve Vite kullanılır.

| Yol | Sorumluluk |
| --- | --- |
| `src/App.jsx` | Sayfalar ve yolculuk akışı |
| `src/data/story.js` | Anlatı metinleri ve mekân verileri |
| `src/data/media.js` | Medya adresi ve sürümleme |
| `src/components/` | Ses ve kaydırma kontrollü video/kare sahneleri |
| `public/assets/` | Yerel görsel, video ve ses varlıkları |
| `scripts/` | Video kodlama, kare çıkarma ve R2 yükleme yardımcıları |

## Yerel kurulum

Node.js ve npm ile:

```bash
npm ci
npm run dev
```

Vite'ın terminalde gösterdiği adresi açın. Bağımlılık sürümleri için kilit dosyasını kullanın.

| Ortam değişkeni | Kullanım |
| --- | --- |
| `VITE_MEDIA_BASE_URL` | Görsel, video, kare ve seslerin ortak taban adresi |
| `VITE_MEDIA_VERSION` | Medya bağlantılarındaki önbellek sürümü |

`VITE_MEDIA_BASE_URL` tanımlanmazsa uygulama yerel `/assets` yolunu kullanır. Örnek ayar dosyası `.env.example`dır; değerleri kendi `.env.local` dosyanızda tutun.

## Medya hazırlığı

Video ve kare üretimi için `scripts/encode-scrub-videos.sh`, `scripts/encode-hq-scrub-videos.sh` ve `scripts/extract-frame-scrub.sh` bulunur. Bu adımların medya araçları ve kaynak dosya gereksinimleri ilgili scriptlerde tanımlıdır.

R2 yükleme yardımcısı `scripts/upload-media-r2.sh`, Cloudflare Wrangler kullanır ve uzak depoya dosya yazar. Yükleme öncesinde bucket, prefix, medya hakları ve `cloudflare-r2-cors.json` yapılandırmasını kontrol edin.

## Derleme ve yayın

```bash
npm run build
npm run preview
```

Statik çıktı `dist/` dizinindedir. `vercel.json`, uygulama yollarını `index.html` dosyasına yönlendirir.

**Medya yayını ayrı hazırlanmalıdır:** `.vercelignore`, yerel görsel, video, ses ve kare dizinlerini Vercel yüklemesinden çıkarır. Vercel'de medya taban adresini erişilebilir bir medya kaynağına yönlendirin. Sayfanın açılması tek başına tüm sahne varlıklarının yüklendiğini göstermez.

Paket içinde otomatik test komutu tanımlı değildir. Yayın kontrolünde doğrudan rota açılışını, mobil/dikey videoyu, ses kontrolünü, video yedek görsellerini ve kaydırmayla kare geçişini deneyin.

## İçerik ve kullanım

Metinler ve medya yolları `src/data/` üzerinden düzenlenir. Kodun GitHub'da görünür olması, fotoğraf ve videoların yeniden kullanım haklarını kendiliğinden vermez; yeniden yayın için ilgili varlıkların izinlerini ayrıca doğrulayın.
