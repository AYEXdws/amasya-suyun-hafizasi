import { mediaPath as assetPath } from "./media";

export const languages = {
  tr: "TR",
  en: "EN",
};

export const uiCopy = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      story: "Hikaye",
      experience: "Deneyim",
      explore: "Kesfet",
    },
    home: {
      eyebrow: "Amasya Deneyimi",
      title: "Amasya'ya Hos Geldin",
      subtitle:
        "Bu sehir aceleyle gezilmez. Once suya, sonra kayaya, sonra avlulara bakilir.",
      route: "Rota ile gez",
      experience: "Etkilesimli deneyim",
      explore: "Mekanlari kesfet",
    },
    story: {
      eyebrow: "Amasya'da bir gun",
      title: "Kiyidan basla, yukariya dogru oku.",
      subtitle:
        "Rota Yeşilirmak kiyisindan acilir; evler, kulliye, kaya, kale ve gece birbirine baglanir.",
      start: "Rotaya basla",
      index: "Durak listesi",
    },
    route: {
      cityNote: "Sehir notu",
      localTip: "Yerel not",
      continue: "Devam et",
      complete: "Yolculugu tamamla",
      nextStop: "Sonraki durak",
      back: "Geri don",
      index: "Durak listesi",
    },
    explore: {
      eyebrow: "Sehir indeksi",
      title: "Amasya'yi parca parca gor.",
      subtitle:
        "Her durak tek basina degil; nehir, ev, kaya ve avlu ayni sehir duzeninin parcalari.",
      enter: "Rotaya gir",
      sound: "Ses onerisi",
    },
    final: {
      eyebrow: "Yolculuk ozeti",
      title: "Amasya geride kalmaz.",
      subtitle:
        "Kiyi, yamaç, avlu ve gece ayni cizgide toplandi. Simdi sehir akilda daha sakin durur.",
      restart: "Yeni yolculuk baslat",
      explore: "Mekanlari kesfet",
    },
    audio: {
      enable: "Sesi ac",
      disable: "Sesi kapat",
      unavailable: "Ses dosyasi bekleniyor",
    },
    scrub: {
      desktop: "Kaydirarak ilerle",
      touch: "Parmaginla ilerlet",
    },
  },
  en: {
    nav: {
      home: "Home",
      story: "Story",
      experience: "Experience",
      explore: "Explore",
    },
    home: {
      eyebrow: "Amasya Experience",
      title: "Welcome to Amasya",
      subtitle:
        "This city is not rushed. Start by the river, then look up to the rock and into the courtyards.",
      route: "Follow the route",
      experience: "Interactive experience",
      explore: "Explore places",
    },
    story: {
      eyebrow: "One day in Amasya",
      title: "Begin by the river, then read the city upward.",
      subtitle:
        "The route opens on the Yeşilirmak, then joins the houses, courtyards, rock tombs, castle and night view.",
      start: "Start the route",
      index: "Stop list",
    },
    route: {
      cityNote: "City note",
      localTip: "Local note",
      continue: "Continue",
      complete: "Finish the journey",
      nextStop: "Next stop",
      back: "Go back",
      index: "Stop list",
    },
    explore: {
      eyebrow: "City index",
      title: "See Amasya in clear layers.",
      subtitle:
        "No stop stands alone here. River, houses, rock and courtyard belong to the same city line.",
      enter: "Enter route",
      sound: "Sound to add",
    },
    final: {
      eyebrow: "Journey summary",
      title: "Amasya does not simply stay behind.",
      subtitle:
        "The riverbank, slope, courtyard and night view now sit on the same line in memory.",
      restart: "Start again",
      explore: "Explore places",
    },
    audio: {
      enable: "Sound on",
      disable: "Sound off",
      unavailable: "Sound file pending",
    },
    scrub: {
      desktop: "Scroll to move",
      touch: "Move with your finger",
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
  "gece-amasya",
  "eski-sokaklar",
  "amasya-yasam",
  "borabay",
  "ferhat-sirin",
];

export const places = [
  {
    id: "yesilirmak",
    texture: "water",
    image: assetPath("images", "yesilirmak.jpg"),
    video: assetPath("videos", "yesilirmak.mp4"),
    ambientSound: assetPath("sounds", "yesilirmak.mp3"),
    soundHint: {
      tr: "Hafif nehir akisi, uzak sehir sesi.",
      en: "Soft river movement with a distant town bed.",
    },
    copy: {
      tr: {
        name: "Yeşilirmak",
        eyebrow: "Irmak kiyisi",
        sceneLine:
          "Amasya'ya ilk bakis suyun kenarindan gelir; evler ve kaya ayni hatta durur.",
        description:
          "Yeşilirmak, tarihî merkezi iki kiyida toplar. Kisa bir yuruyuste Yaliboyu Evleri, Harşena ve kaya mezarlari ayni manzaraya girer.",
        tip: "Sabah erken ya da aksamustu yuru. Isik yumusakken kiyinin olcegi daha iyi okunur.",
        next: [{ label: "Yaliboyu'na devam", nextId: "yaliboyu" }],
      },
      en: {
        name: "Yeşilirmak",
        eyebrow: "Riverbank",
        sceneLine:
          "Amasya first appears from the waterline, where the houses and rock share the same view.",
        description:
          "The Yeşilirmak gathers the historic centre on both banks. In a short walk, the riverside houses, Harşena and the rock tombs come into one frame.",
        tip: "Walk early or near sunset. Softer light makes the river line easier to read.",
        next: [{ label: "Continue to Yaliboyu", nextId: "yaliboyu" }],
      },
    },
  },
  {
    id: "yaliboyu",
    texture: "wood",
    image: assetPath("images", "yaliboyu.jpg"),
    video: assetPath("videos", "yaliboyu.mp4"),
    ambientSound: assetPath("sounds", "yaliboyu.mp3"),
    soundHint: {
      tr: "Su kiyisi, hafif ayak sesi, uzaktan insan sesi.",
      en: "Waterside ambience, soft footsteps, distant voices.",
    },
    copy: {
      tr: {
        name: "Yaliboyu Evleri",
        eyebrow: "Nehre bakan evler",
        sceneLine:
          "Ahşap cumbalar eski surlarin ustunde nehre bakar; sehrin en tanidik yuzu burasidir.",
        description:
          "Yaliboyu Evleri, Yeşilirmak kiyisinda eski sur duvarlari uzerinde siralanir. Ahşap catki, kerpic dolgu ve cumbalar geleneksel Amasya evini acikca gosterir.",
        tip: "Kopruye cik. Evlerin, nehrin ve Harşena'nin nasil ayni kareye girdigini oradan gorursun.",
        next: [{ label: "Sehzadeler izine gir", nextId: "sehzadeler" }],
      },
      en: {
        name: "Yaliboyu Houses",
        eyebrow: "Houses facing the river",
        sceneLine:
          "Timber bay windows stand above old walls and face the river; this is Amasya's most familiar face.",
        description:
          "The Yaliboyu houses line the Yeşilirmak on old city walls. Timber frames, earthen infill and bay windows show the local house type clearly.",
        tip: "Step onto a bridge. From there, the houses, river and Harşena sit in one frame.",
        next: [{ label: "Follow the princes' trace", nextId: "sehzadeler" }],
      },
    },
  },
  {
    id: "sehzadeler",
    texture: "paper",
    image: assetPath("images", "sehzadeler.jpg"),
    video: assetPath("videos", "amasya-ustcekim-hızlı.mp4"),
    ambientSound: assetPath("sounds", "sehzadeler.mp3"),
    soundHint: {
      tr: "Avlu/medrese ambiyansi, dusuk sehir sesi.",
      en: "Courtyard and madrasa ambience with a low town bed.",
    },
    copy: {
      tr: {
        name: "Sehzadeler Sehri",
        eyebrow: "Osmanli merkezi",
        sceneLine:
          "Amasya'da sehzadelik, tek bir yapi degil; avlu, medrese ve sehir duzeniyle okunur.",
        description:
          "Osmanli doneminde sehzadeler sancak tecrubesi icin Amasya'ya geldi. Bu gecmis, merkezdeki kulliye, medrese ve muze cevresinde izlenebilir.",
        tip: "Bu bolumu tek durak gibi degil, merkezde birbirine baglanan bir iz gibi gez.",
        next: [{ label: "Kulliyeye gec", nextId: "bayezid-kulliyesi" }],
      },
      en: {
        name: "City of Princes",
        eyebrow: "Ottoman centre",
        sceneLine:
          "In Amasya, the story of princes is read through courtyards, schools and the order of the town.",
        description:
          "During the Ottoman period, princes came to Amasya for provincial experience. The trace remains around the külliye, madrasas and museums of the centre.",
        tip: "Treat this as a connected walk through the centre, not as a single building.",
        next: [{ label: "Enter the külliye", nextId: "bayezid-kulliyesi" }],
      },
    },
  },
  {
    id: "bayezid-kulliyesi",
    texture: "paper",
    image: assetPath("images", "bayezid-kulliyesi.jpg"),
    video: assetPath("videos", "bayezid-kulliyesi.mp4"),
    ambientSound: assetPath("sounds", "bayezid-kulliyesi.mp3"),
    soundHint: {
      tr: "Avlu sessizligi, hafif kus, tas mekanda yankı.",
      en: "Quiet courtyard, light birds, soft stone echo.",
    },
    copy: {
      tr: {
        name: "II. Bayezid Kulliyesi",
        eyebrow: "Avlu ve tas",
        sceneLine:
          "Avluya girince sehir sesi azalir; tas, golge ve olcu onde kalir.",
        description:
          "II. Bayezid Kulliyesi, Amasya'nin onemli Osmanli yapilarindandir. Cami, avlu ve cevresindeki duzen sehrin sakin asaletini tasir.",
        tip: "Avluda hizlanma. Bir kac dakika durunca yapinin olcusu daha iyi anlasilir.",
        next: [{ label: "Harşena'ya bak", nextId: "kral-kaya" }],
      },
      en: {
        name: "Sultan Bayezid II Külliye",
        eyebrow: "Courtyard and stone",
        sceneLine:
          "Inside the courtyard the town softens; stone, shade and proportion take over.",
        description:
          "The Sultan Bayezid II Külliye is one of Amasya's important Ottoman complexes. Its mosque, courtyard and order carry the city's restrained dignity.",
        tip: "Do not rush the courtyard. A few still minutes explain the scale better.",
        next: [{ label: "Look toward Harşena", nextId: "kral-kaya" }],
      },
    },
  },
  {
    id: "kral-kaya",
    texture: "stone",
    image: assetPath("images", "kral-kaya.jpg"),
    video: assetPath("videos", "kral-kaya-1.30dk-yavas-cekim.mp4"),
    ambientSound: assetPath("sounds", "kral-kaya.mp3"),
    soundHint: {
      tr: "Dusuk ruzgar, taslik alan ambiyansi.",
      en: "Low wind and dry stone ambience.",
    },
    copy: {
      tr: {
        name: "Kral Kaya Mezarlari",
        eyebrow: "Harşena yamaci",
        sceneLine:
          "Pontus krallari icin kayaya oyulan mezarlar, sehrin ustunde sert ve acik durur.",
        description:
          "Kral Kaya Mezarlari Harşena Dagi'nin yamacindadir. Amasya'nin en guclu silueti, nehirden yukari bakinca bu oyuklarla tamamlanir.",
        tip: "Aksamustu golge kayayi belirginlestirir. Mezar bosluklari o saatte daha rahat secilir.",
        next: [{ label: "Harşena'ya yaklas", nextId: "harsena" }],
      },
      en: {
        name: "King Rock Tombs",
        eyebrow: "Harşena slope",
        sceneLine:
          "Carved for the Pontic kings, the tombs stand hard and clear above the city.",
        description:
          "The King Rock Tombs sit on the slope of Mount Harşena. Looking up from the river, these carved openings complete Amasya's strongest silhouette.",
        tip: "Late afternoon shadow defines the rock better and makes the tombs easier to see.",
        next: [{ label: "Move closer to Harşena", nextId: "harsena" }],
      },
    },
  },
  {
    id: "harsena",
    texture: "stone",
    image: assetPath("images", "harsena.jpg"),
    video: assetPath("videos", "harsena.mp4"),
    ambientSound: assetPath("sounds", "harsena.mp3"),
    soundHint: {
      tr: "Yuksek noktada ruzgar, genis alan hissi.",
      en: "High wind and open valley atmosphere.",
    },
    copy: {
      tr: {
        name: "Harşena",
        eyebrow: "Dag ve sehir",
        sceneLine:
          "Harşena, Amasya'nin arkasinda duran buyuk yamaçtir; kale ve mezarlar onun ustundedir.",
        description:
          "Harşena Dagi, kaleyi ve kaya mezarlarini tasir. Nehirle dag arasina kurulan sehrin sikisik ama guclu duzeni burada anlasilir.",
        tip: "Asagiya bakarken sadece manzarayi degil, sehrin nasil yer tuttugunu izle.",
        next: [{ label: "Kaleye cik", nextId: "amasya-kalesi" }],
      },
      en: {
        name: "Harşena",
        eyebrow: "Mountain and town",
        sceneLine:
          "Harşena is the great slope behind Amasya, carrying the castle and rock tombs above the town.",
        description:
          "Mount Harşena holds the castle and the carved tombs. From here, the compact order between river and mountain becomes clear.",
        tip: "Look down not only for the view, but for how the town has found its place.",
        next: [{ label: "Climb to the castle", nextId: "amasya-kalesi" }],
      },
    },
  },
  {
    id: "amasya-kalesi",
    texture: "night",
    image: assetPath("images", "amasya-kalesi.jpg"),
    video: assetPath("videos", "amasya-kalesi.mp4"),
    ambientSound: assetPath("sounds", "amasya-kalesi.mp3"),
    soundHint: {
      tr: "Ruzgar, uzak kus ve sehir ugultusu.",
      en: "Wind, distant birds and a faint town hum.",
    },
    copy: {
      tr: {
        name: "Amasya Kalesi",
        eyebrow: "Yukaridan sehir",
        sceneLine:
          "Kaleden bakinca Yeşilirmak, evler ve kaya ayni vadide neden bulustugu anlasilir.",
        description:
          "Amasya Kalesi Harşena Dagi uzerindedir. Yukaridan nehir kivrimi, Yaliboyu ve eski sehir dokusu birlikte gorunur.",
        tip: "Gunes batmadan cik. Donuste sehir isiklari yavas yavas yanmaya baslar.",
        next: [{ label: "Geceyi bekle", nextId: "gece-amasya" }],
      },
      en: {
        name: "Amasya Castle",
        eyebrow: "Town from above",
        sceneLine:
          "From the castle, the river, houses and rock explain why the city settled in this valley.",
        description:
          "Amasya Castle stands on Mount Harşena. From above, the river bend, Yaliboyu and old town fabric appear together.",
        tip: "Go up before sunset. On the way back, the lights begin to mark the town.",
        next: [{ label: "Wait for night", nextId: "gece-amasya" }],
      },
    },
  },
  {
    id: "gece-amasya",
    texture: "night",
    image: assetPath("images", "gece-amasya.jpg"),
    video: assetPath("videos", "gece-amasya.mp4"),
    ambientSound: assetPath("sounds", "gece-amasya.mp3"),
    soundHint: {
      tr: "Gece kiyisi, su, uzak trafik ve sehir ugultusu.",
      en: "Night riverside, water, distant traffic and town hum.",
    },
    copy: {
      tr: {
        name: "Gece Amasya",
        eyebrow: "Isik ve su",
        sceneLine:
          "Gece olunca Yaliboyu isiklari suya iner; kaya bu kez karanlikta buyur.",
        description:
          "Gece Amasya'da nehir kiyisi, ev isiklari ve kaya silueti birlikte gorunur. Gunduz kalabaligi azalinca sehrin cizgisi sadeleşir.",
        tip: "Kiyida biraz bekle. Isiklar suya oturdugunda manzara daha sakin gorunur.",
        next: [{ label: "Sokaklara in", nextId: "eski-sokaklar" }],
      },
      en: {
        name: "Amasya at Night",
        eyebrow: "Light and water",
        sceneLine:
          "At night the Yaliboyu lights fall onto the river, and the rock grows darker above them.",
        description:
          "At night, the riverside, house lights and rock silhouette appear together. With the daytime crowd gone, the city line becomes simpler.",
        tip: "Stay by the water for a moment. The view settles when the lights settle on the river.",
        next: [{ label: "Enter the streets", nextId: "eski-sokaklar" }],
      },
    },
  },
  {
    id: "eski-sokaklar",
    texture: "wood",
    image: assetPath("images", "eski-sokaklar.jpg"),
    video: assetPath("videos", "yaliboyu2.mp4"),
    ambientSound: assetPath("sounds", "eski-sokaklar.mp3"),
    soundHint: {
      tr: "Dar sokak, ayak sesi, kapi ve uzaktan konusma.",
      en: "Narrow street, footsteps, doors and distant voices.",
    },
    copy: {
      tr: {
        name: "Eski Sokaklar",
        eyebrow: "Sehir ici",
        sceneLine:
          "Buyuk manzaradan cikinca Amasya kapi, esik ve dar sokak olcegine iner.",
        description:
          "Eski sokaklarda ahşap cepheler, tas esikler, dar gecisler ve pencere golgeleri one cikar. Burası sehrin yasayan tarafidir.",
        tip: "Ana yoldan kisa sapmalar yap. Bazen iyi goruntu yan sokakta karsina cikar.",
        next: [{ label: "Bugunun sehrine bak", nextId: "amasya-yasam" }],
      },
      en: {
        name: "Old Streets",
        eyebrow: "Inside the town",
        sceneLine:
          "Away from the grand view, Amasya comes down to doors, thresholds and narrow lanes.",
        description:
          "In the old streets, timber fronts, stone thresholds, narrow passages and window shadows come forward. This is the lived part of the town.",
        tip: "Leave the main road briefly. A better view often appears in a side street.",
        next: [{ label: "Look at today's city", nextId: "amasya-yasam" }],
      },
    },
  },
  {
    id: "amasya-yasam",
    texture: "paper",
    image: assetPath("images", "amasya-yasam.jpg"),
    video: assetPath("videos", "amasya-karsık-manzara-karma.mp4"),
    ambientSound: assetPath("sounds", "amasya-yasam.mp3"),
    soundHint: {
      tr: "Carsi, kiyı yuruyusu ve gundelik sehir sesi.",
      en: "Market, riverside walk and everyday town sound.",
    },
    copy: {
      tr: {
        name: "Amasya'da Yasam",
        eyebrow: "Bugunun sehri",
        sceneLine:
          "Pazar sesi, cay molasi ve kiyı yuruyusu; Amasya yalniz gecmiste durmaz.",
        description:
          "Carsi, pazar, kiyı yuruyusu ve aksam cayi sehrin bugunku ritmini gosterir. Tarihi dokunun icinde gundelik hayat devam eder.",
        tip: "Bir yerde oturup etrafa bak. Amasya bazen yururken degil, beklerken anlasilir.",
        next: [{ label: "Borabay'a gec", nextId: "borabay" }],
      },
      en: {
        name: "Life in Amasya",
        eyebrow: "The city today",
        sceneLine:
          "Market sound, tea breaks and riverside walks keep Amasya in the present.",
        description:
          "The market, riverside walk and evening tea show the city's present rhythm. Daily life continues inside the historic fabric.",
        tip: "Sit somewhere and watch. Amasya is sometimes clearer when you wait.",
        next: [{ label: "Move to Borabay", nextId: "borabay" }],
      },
    },
  },
  {
    id: "borabay",
    texture: "forest",
    image: assetPath("images", "borabay.jpg"),
    video: assetPath("videos", "borabay.mp4"),
    ambientSound: assetPath("sounds", "borabay.mp3"),
    soundHint: {
      tr: "Gol, orman, kus ve hafif ruzgar.",
      en: "Lake, forest, birds and light wind.",
    },
    copy: {
      tr: {
        name: "Borabay",
        eyebrow: "Gol yolu",
        sceneLine:
          "Merkezden uzaklasinca su bu kez akmaz; golun ustunde yavaslar.",
        description:
          "Borabay Golu, Amasya merkezinin disinda orman icinde yer alir. Tarihi merkezden sonra sehrin daha serin ve acik tarafini gosterir.",
        tip: "Burayi hizli bir fotograf molasi yapma. Gol kenarinda biraz kalmak gerekir.",
        next: [{ label: "Ferhat yoluna don", nextId: "ferhat-sirin" }],
      },
      en: {
        name: "Borabay",
        eyebrow: "Road to the lake",
        sceneLine:
          "Outside the centre, water no longer runs; it slows over the lake.",
        description:
          "Borabay Lake sits outside central Amasya, within forest. After the historic centre, it shows a cooler and more open side of the province.",
        tip: "Do not treat it as a quick photo stop. The lake needs a little time.",
        next: [{ label: "Return to Ferhat's route", nextId: "ferhat-sirin" }],
      },
    },
  },
  {
    id: "ferhat-sirin",
    texture: "road",
    image: assetPath("images", "ferhat-sirin.jpg"),
    video: assetPath("videos", "ferhat-sirin.mp4"),
    ambientSound: assetPath("sounds", "ferhat-sirin.mp3"),
    soundHint: {
      tr: "Ruzgar, tas/yol ambiyansi, cok dusuk su hissi.",
      en: "Wind, stone road ambience and a very low water trace.",
    },
    copy: {
      tr: {
        name: "Ferhat ile Şirin",
        eyebrow: "Efsane ve su",
        sceneLine:
          "Bu hikayede ask kadar emek vardir; kaya ve su yolu bunu daha gercek kilar.",
        description:
          "Ferhat ile Şirin anlatisi Amasya'da su yolu ve kaya ile birlikte anilir. Bu yüzden hikaye yalniz romantik degil, mekana bagli bir emek izidir.",
        tip: "Kayaya ve yolun yonune dikkat et. Efsane, burada arazinin icinde guclenir.",
        next: [{ label: "Yolculugu tamamla", nextId: "final" }],
      },
      en: {
        name: "Ferhat and Şirin",
        eyebrow: "Legend and water",
        sceneLine:
          "This story carries labour as much as love; the rock and water channel make it tangible.",
        description:
          "The tale of Ferhat and Şirin in Amasya is linked with a water channel and rock. It is not only romance, but a trace of effort tied to place.",
        tip: "Watch the rock and the direction of the path. The legend gains force through the terrain.",
        next: [{ label: "Finish the journey", nextId: "final" }],
      },
    },
  },
];

export const placeMap = places.reduce((map, place) => {
  map[place.id] = place;
  return map;
}, {});

export const getPlaceCopy = (place, locale = "tr") =>
  place?.copy?.[locale] || place?.copy?.tr || {};

export const getSoundHint = (place, locale = "tr") =>
  place?.soundHint?.[locale] || place?.soundHint?.tr || "";
