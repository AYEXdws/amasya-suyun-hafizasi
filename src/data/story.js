import { mediaPath as assetPath } from "./media";

export const uiCopy = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      story: "Hikâye",
      explore: "Keşfet",
    },
    home: {
      eyebrow: "Amasya'ya giriş",
      title: "Amasya'ya Hoş Geldin",
      subtitle:
        "Bu şehir aceleyle gezilmez. Yeşilırmak'ın kıyısından başlar, Harşena'nın taşında derinleşir, avlularda ve sokaklarda usulca tamamlanır.",
      route: "Rota ile gez",
      explore: "Mekânları keşfet",
    },
    story: {
      eyebrow: "Amasya'da bir gün",
      title: "Kıyıdan başla, şehri yavaş yavaş yükselerek oku.",
      subtitle:
        "Yeşilırmak kıyısı, Yalıboyu Evleri, külliye avlusu, Kral Kaya Mezarları ve Harşena aynı vadide birbirine bağlanır.",
      start: "Rotaya başla",
      index: "Durak listesi",
    },
    route: {
      cityNote: "Şehir notu",
      localTip: "Yerel not",
      continue: "Devam et",
      complete: "Yolculuğu tamamla",
      nextStop: "Sonraki durak",
      back: "Geri dön",
      index: "Durak listesi",
    },
    explore: {
      eyebrow: "Amasya'nın izleri",
      title: "Amasya'yı su, taş ve avlu üzerinden keşfet.",
      subtitle:
        "Her durak tek başına değil; Yeşilırmak, Yalıboyu, Harşena ve Osmanlı şehir düzeniyle birlikte anlam kazanır.",
      enter: "Rotaya gir",
    },
    final: {
      eyebrow: "Yolculuk özeti",
      title: "Amasya geride kalmaz.",
      subtitle:
        "Kıyı, yamaç, avlu ve sokak aynı şehir çizgisinde birleşti. Şimdi Amasya gözden çok akılda kalır.",
      restart: "Yeni yolculuk başlat",
      explore: "Mekânları keşfet",
    },
    audio: {
      enable: "Sesi aç",
      disable: "Sesi kapat",
      unavailable: "Ses dosyası bekleniyor",
    },
    scrub: {
      desktop: "Yavaşça kaydır",
      touch: "Parmağını yavaşça kaydır",
      loading: "Video hazırlanıyor",
    },
  },
};

export const dayRouteIds = [
  "yesilirmak",
  "yaliboyu",
  "sehzadeler",
  "bayezid-kulliyesi",
  "kral-kaya",
  "harsena",
  "amasya-kalesi",
  "kisin-amasya",
  "eski-sokaklar",
  "amasya-yasam",
  "boraboy",
  "ferhat-sirin",
];

export const places = [
  {
    id: "yesilirmak",
    texture: "water",
    image: assetPath("images", "yesilirmak.jpg"),
    video: assetPath("videos", "yesilirmak.mp4"),
    mobileVideo: assetPath("videos", "yesil-irmak-9-16.mp4"),
    ambientSound: assetPath("sounds", "yesilirmak.mp3"),
    soundHint: {
      tr: "Hafif nehir akışı, uzaktan gelen şehir sesi.",
    },
    copy: {
      tr: {
        name: "Yeşilırmak",
        eyebrow: "Irmak kıyısı",
        sceneLine:
          "Amasya önce suyun çizgisinde görünür; evler kıyıya iner, Harşena arkada yükselir.",
        description:
          "Yeşilırmak, tarihî merkezi iki kıyıda bir araya getirir. Kısa bir yürüyüşte Yalıboyu Evleri, Harşena Dağı ve Kral Kaya Mezarları aynı manzaranın içinde okunur.",
        tip: "Sabah erken ya da akşamüstü yürü. Işık yumuşadığında kıyının ritmi daha sakin anlaşılır.",
        next: [{ label: "Yalıboyu'na devam", nextId: "yaliboyu" }],
      },
    },
  },
  {
    id: "yaliboyu",
    texture: "wood",
    image: assetPath("images", "yaliboyu.jpg"),
    video: assetPath("videos", "yaliboyu.mp4"),
    mobileVideo: assetPath("videos", "yaliboyu-9-16.mp4"),
    ambientSound: assetPath("sounds", "yaliboyu.mp3"),
    soundHint: {
      tr: "Su kıyısı, hafif ayak sesi, uzaktan insan sesi.",
    },
    copy: {
      tr: {
        name: "Yalıboyu Evleri",
        eyebrow: "Nehre bakan evler",
        sceneLine:
          "Ahşap cumbalar eski surların üstünden nehre bakar; Amasya'nın en tanıdık yüzü burada durur.",
        description:
          "Yalıboyu Evleri, Yeşilırmak kıyısındaki eski sur duvarları üzerinde sıralanır. Ahşap çatkı, kerpiç dolgu, cumbalı cephe ve kiremit çatı bu yerel dokuyu açıkça gösterir.",
        tip: "Köprüye çık. Evlerin, nehrin ve Harşena'nın nasıl aynı kareye girdiğini oradan daha iyi görürsün.",
        next: [{ label: "Şehzadelerin izine gir", nextId: "sehzadeler" }],
      },
    },
  },
  {
    id: "sehzadeler",
    texture: "paper",
    image: assetPath("images", "sehzadeler.jpg"),
    video: assetPath("videos", "bayezid-kulliyesi.mp4"),
    mobileVideo: assetPath("videos", "bayezid-kulliyesi-9-16.mp4"),
    ambientSound: assetPath("sounds", "sehzadeler.mp3"),
    soundHint: {
      tr: "Avlu ve medrese ambiyansı, düşük şehir sesi.",
    },
    copy: {
      tr: {
        name: "Şehzadeler Şehri",
        eyebrow: "Osmanlı hafızası",
        sceneLine:
          "Amasya'da şehzadelik bir unvan değil; avlulara, medreselere ve şehir düzenine sinmiş bir terbiyedir.",
        description:
          "Osmanlı döneminde birçok şehzade Amasya'da sancak tecrübesi kazandı. Bu geçmiş, merkezdeki külliye, medrese ve müze çevresinde hâlâ izlenebilir.",
        tip: "Bu bölümü tek yapı gibi gezme. Merkezde birbirine bağlanan küçük avlulara ve geçişlere dikkat et.",
        next: [{ label: "Külliyeye geç", nextId: "bayezid-kulliyesi" }],
      },
    },
  },
  {
    id: "bayezid-kulliyesi",
    texture: "paper",
    image: assetPath("images", "bayezid-kulliyesi.jpg"),
    video: assetPath("videos", "bayezid-kulliyesi.mp4"),
    mobileVideo: assetPath("videos", "bayezid-kulliyesi-9-16.mp4"),
    ambientSound: assetPath("sounds", "bayezid-kulliyesi.mp3"),
    soundHint: {
      tr: "Avlu sessizliği, hafif kuş sesi, taş mekânda yumuşak yankı.",
    },
    copy: {
      tr: {
        name: "II. Bayezid Külliyesi",
        eyebrow: "Avlu ve taş",
        sceneLine:
          "Avluya girince şehir sesi azalır; taş, gölge ve ölçü kendini belli eder.",
        description:
          "II. Bayezid Külliyesi, Amasya'nın Osmanlı döneminden kalan önemli yapı topluluklarından biridir. Cami, avlu ve çevresindeki düzen şehrin sakin asaletini taşır.",
        tip: "Avluda hızlanma. Birkaç dakika durunca yapının dengesi ve taşın serinliği daha iyi anlaşılır.",
        next: [{ label: "Harşena'ya bak", nextId: "kral-kaya" }],
      },
    },
  },
  {
    id: "kral-kaya",
    texture: "stone",
    image: assetPath("images", "kral-kaya.jpg"),
    video: assetPath("videos", "kral-kaya.mp4"),
    mobileVideo: assetPath("videos", "kral-kaya-9-16.mp4"),
    ambientSound: assetPath("sounds", "kral-kaya.mp3"),
    soundHint: {
      tr: "Düşük rüzgâr, taşlık alan ambiyansı.",
    },
    copy: {
      tr: {
        name: "Kral Kaya Mezarları",
        eyebrow: "Harşena yamacı",
        sceneLine:
          "Pontus kralları için kayaya oyulan mezarlar, şehrin üstünde hâlâ güçlü bir bakış gibi durur.",
        description:
          "Kral Kaya Mezarları, Harşena Dağı'nın güney yamacına oyulmuş anıtsal kaya mezarlarıdır. Amasya'nın en güçlü silueti, nehirden yukarı bakınca bu oyuklarla tamamlanır.",
        tip: "Akşamüstü gölge kayayı belirginleştirir. Mezar boşlukları o saatlerde daha rahat seçilir.",
        next: [{ label: "Harşena'ya yaklaş", nextId: "harsena" }],
      },
    },
  },
  {
    id: "harsena",
    texture: "stone",
    image: assetPath("images", "harsena.jpg"),
    video: assetPath("videos", "harsena.mp4"),
    mobileVideo: assetPath("videos", "harsena-9-16.mp4"),
    ambientSound: assetPath("sounds", "harsena.mp3"),
    soundHint: {
      tr: "Yüksek noktada rüzgâr, geniş vadi hissi.",
    },
    copy: {
      tr: {
        name: "Harşena",
        eyebrow: "Dağ ve şehir",
        sceneLine:
          "Harşena, Amasya'nın sırtını dayadığı büyük yamaçtır; kale ve mezarlar onun üstünde durur.",
        description:
          "Harşena Dağı, kaleyi ve kaya mezarlarını taşır. Nehirle dağ arasına kurulan şehrin dar ama güçlü düzeni burada daha açık anlaşılır.",
        tip: "Aşağıya bakarken yalnız manzarayı değil, şehrin vadide nasıl yer tuttuğunu izle.",
        next: [{ label: "Kaleye çık", nextId: "amasya-kalesi" }],
      },
    },
  },
  {
    id: "amasya-kalesi",
    texture: "night",
    image: assetPath("images", "amasya-kalesi.jpg"),
    video: assetPath("videos", "amasya-kalesi.mp4"),
    mobileVideo: assetPath("videos", "amasya-kalesi-9-16.mp4"),
    ambientSound: assetPath("sounds", "amasya-kalesi.mp3"),
    soundHint: {
      tr: "Rüzgâr, uzak kuş sesi ve hafif şehir uğultusu.",
    },
    copy: {
      tr: {
        name: "Amasya Kalesi",
        eyebrow: "Yukarıdan şehir",
        sceneLine:
          "Kaleden bakınca Yeşilırmak, evler ve kaya aynı vadide neden buluşmuş, daha iyi anlaşılır.",
        description:
          "Amasya Kalesi, Harşena Dağı üzerinde yer alır. Yukarıdan nehir kıvrımı, Yalıboyu ve eski şehir dokusu birlikte görünür.",
        tip: "Güneş batmadan çık. Dönüşte şehir ışıkları yavaş yavaş yanmaya başlar.",
        next: [{ label: "Kış manzarasına in", nextId: "kisin-amasya" }],
      },
    },
  },
  {
    id: "kisin-amasya",
    texture: "forest",
    image: assetPath("images", "amasya-kisin.jpg"),
    video: assetPath("videos", "amasya-kisin.mp4"),
    mobileVideo: assetPath("videos", "amasya-kisin-9-16.mp4"),
    ambientSound: assetPath("sounds", "amasya-kisin.mp3"),
    soundHint: {
      tr: "Soğuk hava, hafif rüzgâr, uzaktan şehir sesi.",
    },
    copy: {
      tr: {
        name: "Kışın Amasya",
        eyebrow: "Açık siluet",
        sceneLine:
          "Kış ışığında Amasya sadeleşir; kaya, nehir ve evler aynı çizgide daha net görünür.",
        description:
          "Soğuk ve açık havalarda Harşena yamacı, Yalıboyu ve Yeşilırmak hattı daha temiz okunur. Şehir kalabalığından arınıp kendi çizgisine döner.",
        tip: "Hava açıksa yüksekten bak. Kış manzarası Amasya'nın vadideki yerini daha net gösterir.",
        next: [{ label: "Sokaklara in", nextId: "eski-sokaklar" }],
      },
    },
  },
  {
    id: "eski-sokaklar",
    texture: "wood",
    image: assetPath("images", "eski-sokaklar.jpg"),
    video: assetPath("videos", "eskı-sokaklar.mp4"),
    mobileVideo: assetPath("videos", "eski-sokaklar-9-16.mp4"),
    ambientSound: assetPath("sounds", "eski-sokaklar.mp3"),
    soundHint: {
      tr: "Dar sokak, ayak sesi, kapı sesi ve uzaktan konuşma.",
    },
    copy: {
      tr: {
        name: "Eski Sokaklar",
        eyebrow: "Şehir içi",
        sceneLine:
          "Büyük manzaradan çıkınca Amasya kapı, eşik ve dar sokak ölçeğine iner.",
        description:
          "Eski sokaklarda ahşap cepheler, taş eşikler, dar geçişler ve pencere gölgeleri öne çıkar. Burası şehrin hâlâ yaşayan tarafıdır.",
        tip: "Ana yoldan kısa sapmalar yap. Bazen iyi görüntü yan sokakta karşına çıkar.",
        next: [{ label: "Bugünün şehrine bak", nextId: "amasya-yasam" }],
      },
    },
  },
  {
    id: "amasya-yasam",
    texture: "paper",
    image: assetPath("images", "amasya-yasam.jpg"),
    video: assetPath("videos", "cınematık-karısık-manzara-amasya.mp4"),
    mobileVideo: assetPath("videos", "sinemattik-cekim-9-16.mp4"),
    ambientSound: assetPath("sounds", "amasya-yasam.mp3"),
    soundHint: {
      tr: "Çarşı, kıyı yürüyüşü ve gündelik şehir sesi.",
    },
    copy: {
      tr: {
        name: "Amasya'da Yaşam",
        eyebrow: "Bugünün şehri",
        sceneLine:
          "Pazar sesi, çay molası ve kıyı yürüyüşü; Amasya yalnız geçmişte durmaz.",
        description:
          "Çarşı, pazar, kıyı yürüyüşü ve akşam çayı şehrin bugünkü ritmini gösterir. Tarihî dokunun içinde gündelik hayat devam eder.",
        tip: "Bir yerde oturup etrafa bak. Amasya bazen yürürken değil, beklerken anlaşılır.",
        next: [{ label: "Boraboy'a geç", nextId: "boraboy" }],
      },
    },
  },
  {
    id: "boraboy",
    texture: "forest",
    image: assetPath("images", "borabay.jpg"),
    video: assetPath("videos", "borabay.mp4"),
    mobileVideo: assetPath("videos", "borabay-9-16.mp4"),
    ambientSound: assetPath("sounds", "borabay.mp3"),
    soundHint: {
      tr: "Göl, orman, kuş sesi ve hafif rüzgâr.",
    },
    copy: {
      tr: {
        name: "Boraboy",
        eyebrow: "Göl yolu",
        sceneLine:
          "Merkezden uzaklaşınca su bu kez akmaz; gölün üstünde yavaşlar.",
        description:
          "Boraboy Gölü, Amasya merkezinin dışında orman içinde yer alır. Tarihî merkezden sonra şehrin daha serin ve açık tarafını gösterir.",
        tip: "Burayı hızlı bir fotoğraf molası yapma. Göl kenarında biraz kalmak gerekir.",
        next: [{ label: "Ferhat yoluna dön", nextId: "ferhat-sirin" }],
      },
    },
  },
  {
    id: "ferhat-sirin",
    texture: "road",
    image: assetPath("images", "ferhat-sirin.jpg"),
    video: assetPath("videos", "ferhat-sirin.mp4"),
    mobileVideo: assetPath("videos", "ferhat-sirin-9-16.mp4"),
    ambientSound: assetPath("sounds", "ferhat-sirin.mp3"),
    soundHint: {
      tr: "Rüzgâr, taş ve yol ambiyansı, çok düşük su hissi.",
    },
    copy: {
      tr: {
        name: "Ferhat ile Şirin",
        eyebrow: "Efsane ve su",
        sceneLine:
          "Bu hikâyede aşk kadar emek vardır; kaya ve su yolu anlatıyı yere bağlar.",
        description:
          "Ferhat ile Şirin anlatısı Amasya'da su yolu ve kaya ile birlikte anılır. Bu yüzden hikâye yalnız romantik değil, mekâna bağlı bir emek izidir.",
        tip: "Kayaya ve yolun yönüne dikkat et. Efsane burada arazinin içinde güçlenir.",
        next: [{ label: "Yolculuğu tamamla", nextId: "final" }],
      },
    },
  },
];

export const placeMap = places.reduce((map, place) => {
  map[place.id] = place;
  return map;
}, {});

placeMap.borabay = placeMap.boraboy;
placeMap["bora-boy"] = placeMap.boraboy;

export const getPlaceCopy = (place, locale = "tr") =>
  place?.copy?.[locale] || place?.copy?.tr || {};
