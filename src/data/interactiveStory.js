export const storyStartId = "arrival";

export const storyUi = {
  tr: {
    notebook: "Defter",
    cityNote: "Sehir notu",
    restart: "Bastan basla",
  },
  en: {
    notebook: "Notebook",
    cityNote: "City note",
    restart: "Start again",
  },
};

export const storyNodes = [
  {
    id: "arrival",
    placeId: "yesilirmak",
    clue: { tr: "Irmak cizgisi", en: "River line" },
    copy: {
      tr: {
        title: "Varis",
        kicker: "Aksamustu / Amasya girisi",
        text: [
          "Uzun bir yolun ardindan Amasya'ya vardin.",
          "Elindeki eski fotograf nehre bakan ahsap evleri ve arkadaki kayayi gosteriyor.",
          "Fotografin arkasinda tek not var: once kiyiyi bul.",
        ],
        fact:
          "Amasya'nin merkezinden Yeşilirmak gecer. Sehrin ana goruntusu nehir, Yaliboyu Evleri ve Harşena'nin ayni hatta durmasiyla olusur.",
        localLine: "Ilk yuruyusu kiyidan yapmak iyi bir baslangictir.",
        choices: [
          { label: "Irmağa in", nextId: "river" },
          { label: "Fotograftaki evlere bak", nextId: "photo-detail" },
        ],
      },
      en: {
        title: "Arrival",
        kicker: "Late afternoon / Entering Amasya",
        text: [
          "After a long road, you arrive in Amasya.",
          "An old photograph in your hand shows timber houses facing the river, with rock rising behind them.",
          "On the back, one note is written: find the bank first.",
        ],
        fact:
          "The Yeşilirmak passes through central Amasya. The city's main image is formed by the river, Yaliboyu houses and Harşena standing on the same line.",
        localLine: "The riverside is the right place to begin.",
        choices: [
          { label: "Go down to the river", nextId: "river" },
          { label: "Study the houses", nextId: "photo-detail" },
        ],
      },
    },
  },
  {
    id: "photo-detail",
    placeId: "yaliboyu",
    clue: { tr: "Ahsap cephe", en: "Timber facade" },
    copy: {
      tr: {
        title: "Fotograftaki Evler",
        kicker: "Yaliboyu / Eski sur ustu",
        text: [
          "Fotografi buyutunce evlerin suya ne kadar yakin durdugunu fark ediyorsun.",
          "Cumbalar, dar cepheler ve arkadaki kaya ayni kareye sigmis.",
          "Burası tek bir ev degil, Amasya'nin kiyidan gorunen yuzudur.",
        ],
        fact:
          "Yaliboyu Evleri, Yeşilirmak kiyisinda eski sur duvarlari uzerinde siralanan geleneksel Amasya evleridir.",
        localLine: "Ayni evlere kopruden bakinca nehirle iliskileri daha iyi gorunur.",
        choices: [
          { label: "Kopruye cik", nextId: "bridge-view" },
          { label: "Kiyiya in", nextId: "river" },
        ],
      },
      en: {
        title: "The Houses in the Photograph",
        kicker: "Yaliboyu / Above the old walls",
        text: [
          "When you enlarge the photograph, the houses appear very close to the water.",
          "Bay windows, narrow fronts and the rock behind them fit into one frame.",
          "This is not a single house. It is the riverside face of Amasya.",
        ],
        fact:
          "The Yaliboyu houses are traditional Amasya houses lined along the Yeşilirmak, above old city walls.",
        localLine: "From a bridge, their relationship with the river becomes clearer.",
        choices: [
          { label: "Step onto the bridge", nextId: "bridge-view" },
          { label: "Go to the bank", nextId: "river" },
        ],
      },
    },
  },
  {
    id: "river",
    placeId: "yesilirmak",
    clue: { tr: "Kiyi yuruyusu", en: "Riverside walk" },
    copy: {
      tr: {
        title: "Kiyi",
        kicker: "Yeşilirmak",
        text: [
          "Suyun sesi yuksek degil; burada onemli olan cizgidir.",
          "Bir yanda evler, yukarida kaya, ortada irmak vardir.",
          "Amasya'nin neden bu kadar dar ve guclu gorundugunu anlamaya baslarsin.",
        ],
        fact:
          "Yeşilirmak, tarihî merkezi iki kiyida toplar ve rotanin dogal baslangicidir.",
        localLine: "Kiyida yavas yurumek sehrin olcegini hissettirir.",
        choices: [
          { label: "Evlerin sirasini izle", nextId: "yaliboyu" },
          { label: "Yukariya bak", nextId: "rock-first" },
        ],
      },
      en: {
        title: "The Bank",
        kicker: "Yeşilirmak",
        text: [
          "The water is not loud here; the important thing is the line.",
          "Houses on one side, rock above, river in the middle.",
          "You begin to understand why Amasya feels so narrow and strong.",
        ],
        fact:
          "The Yeşilirmak gathers the historic centre on both banks and forms the natural start of the route.",
        localLine: "Walking slowly by the water gives the town its scale.",
        choices: [
          { label: "Follow the houses", nextId: "yaliboyu" },
          { label: "Look upward", nextId: "rock-first" },
        ],
      },
    },
  },
  {
    id: "yaliboyu",
    placeId: "yaliboyu",
    clue: { tr: "Kopru acisi", en: "Bridge angle" },
    copy: {
      tr: {
        title: "Yaliboyu",
        kicker: "Nehre bakan cepheler",
        text: [
          "Evlerin onunde durunca fotograf daha okunur hale geliyor.",
          "Ahsap, suya yakin duruyor; kaya geride bekliyor.",
          "Amasya'nin en tanidik manzarasi aslinda cok sade bir dizilim.",
        ],
        fact:
          "Amasya evlerinde ahsap catki, kerpic dolgu, cumbali cephe ve avlulu duzen sik gorulur.",
        localLine: "Karsidan ve kopruden bakmadan bu cephe tam anlasilmaz.",
        choices: [
          { label: "Kopruye cik", nextId: "bridge-view" },
          { label: "Kaya mezarlarina yonel", nextId: "rock-first" },
        ],
      },
      en: {
        title: "Yaliboyu",
        kicker: "Facades facing the river",
        text: [
          "Standing before the houses, the photograph becomes easier to read.",
          "Timber sits close to the water; the rock waits behind it.",
          "Amasya's best-known view is a very simple alignment.",
        ],
        fact:
          "Amasya houses often use timber frames, earthen infill, bay windows and courtyard layouts.",
        localLine: "The facade is best understood from across the river and from a bridge.",
        choices: [
          { label: "Step onto the bridge", nextId: "bridge-view" },
          { label: "Head to the rock tombs", nextId: "rock-first" },
        ],
      },
    },
  },
  {
    id: "bridge-view",
    placeId: "gece-amasya",
    clue: { tr: "Dogru hiza", en: "The right alignment" },
    copy: {
      tr: {
        title: "Kopru Ustu",
        kicker: "Bakis noktasi",
        text: [
          "Koprude fotografla ayni hizayi yakaliyorsun.",
          "Nehir asagida, evler karsida, kaya arkada duruyor.",
          "Amasya'nin etkisi tek bir noktadan degil, bu parcalarin birlikte durmasindan geliyor.",
        ],
        fact:
          "Amasya manzarasi cogu zaman uc parcayla guclenir: nehir, Yaliboyu Evleri ve Harşena.",
        localLine: "Kopruler burada yalniz gecis degil, bakis yeridir.",
        choices: [
          { label: "Kral Kaya'ya yonel", nextId: "rock-first" },
          { label: "Geceyi bekle", nextId: "night-river" },
        ],
      },
      en: {
        title: "On the Bridge",
        kicker: "Viewpoint",
        text: [
          "On the bridge, you find the same alignment as the photograph.",
          "River below, houses across, rock behind.",
          "Amasya's force comes not from one point, but from these parts standing together.",
        ],
        fact:
          "Amasya's view is often strongest when three parts align: the river, Yaliboyu houses and Harşena.",
        localLine: "Bridges here are not only crossings; they are viewing points.",
        choices: [
          { label: "Head to the rock tombs", nextId: "rock-first" },
          { label: "Wait for night", nextId: "night-river" },
        ],
      },
    },
  },
  {
    id: "rock-first",
    placeId: "kral-kaya",
    clue: { tr: "Kaya bosluklari", en: "Rock openings" },
    copy: {
      tr: {
        title: "Yamactaki Mezarlar",
        kicker: "Harşena",
        text: [
          "Basini kaldirinca kayaya oyulmus buyuk bosluklari goruyorsun.",
          "Uzaktan bile sehrin ustunde duruyorlar.",
          "Biri yanindan gecerken buranin Pontus krallariyla anildigini soyluyor.",
        ],
        fact:
          "Kral Kaya Mezarlari, Pontus doneminde Harşena Dagi'nin yamacina oyulmus anitsal kaya mezarlaridir.",
        localLine: "Golge dustugunde kaya yuzeyi ve mezar bosluklari daha belirgin gorunur.",
        choices: [
          { label: "Harşena yoluna gir", nextId: "harsena-path" },
          { label: "Merkeze in", nextId: "sehzade-courtyard" },
        ],
      },
      en: {
        title: "Tombs on the Slope",
        kicker: "Harşena",
        text: [
          "Looking up, you see large openings carved into the rock.",
          "Even from below, they stand above the city.",
          "Someone passing by says they are remembered with the Pontic kings.",
        ],
        fact:
          "The King Rock Tombs are monumental tombs carved into Mount Harşena during the Pontic period.",
        localLine: "When shadow falls, the rock face and tomb openings become clearer.",
        choices: [
          { label: "Take the Harşena path", nextId: "harsena-path" },
          { label: "Go down to the centre", nextId: "sehzade-courtyard" },
        ],
      },
    },
  },
  {
    id: "harsena-path",
    placeId: "harsena",
    clue: { tr: "Yukari bakis", en: "Upper view" },
    copy: {
      tr: {
        title: "Harşena Yolu",
        kicker: "Yukari cikarken",
        text: [
          "Yol yukseldikce nehir inceliyor.",
          "Evlerin kayaya ne kadar yakin kuruldugu yukaridan daha acik.",
          "Fotograftaki manzara bir tesaduf degil; sehrin yer secimi.",
        ],
        fact:
          "Harşena Dagi, kale ve kaya mezarlariyla Amasya'nin tarihî siluetini belirler.",
        localLine: "Asagiya bakarken nehrin sehrin icinden nasil gectigini izle.",
        choices: [
          { label: "Kaleye devam et", nextId: "castle" },
          { label: "Kulliyeye in", nextId: "sehzade-courtyard" },
        ],
      },
      en: {
        title: "The Harşena Path",
        kicker: "Climbing upward",
        text: [
          "As the path rises, the river becomes thinner.",
          "From above, the houses appear very close to the rock.",
          "The photograph is not an accident; it is the town's placement.",
        ],
        fact:
          "Mount Harşena, with the castle and rock tombs, defines Amasya's historic silhouette.",
        localLine: "Look down and follow how the river cuts through the town.",
        choices: [
          { label: "Continue to the castle", nextId: "castle" },
          { label: "Go down to the külliye", nextId: "sehzade-courtyard" },
        ],
      },
    },
  },
  {
    id: "castle",
    placeId: "amasya-kalesi",
    clue: { tr: "Vadi bakisi", en: "Valley view" },
    copy: {
      tr: {
        title: "Kale",
        kicker: "Yukaridan sehir",
        text: [
          "Kaleden bakinca parcalar yerine oturuyor.",
          "Irmak kivriliyor, evler kiyida diziliyor, kaya sehrin arkasinda duruyor.",
          "Amasya'nin neden bu vadide buyudugu artik daha acik.",
        ],
        fact:
          "Amasya Kalesi, Harşena Dagi uzerinde yer alir ve Yeşilirmak vadisini genis aciyla gorur.",
        localLine: "Gunes batimina yakin cikarsan donuste isiklar yanmaya baslar.",
        choices: [
          { label: "Gece kiyisina don", nextId: "night-river" },
          { label: "Avluya in", nextId: "sehzade-courtyard" },
        ],
      },
      en: {
        title: "The Castle",
        kicker: "Town from above",
        text: [
          "From the castle, the parts fall into place.",
          "The river bends, houses line the bank, and the rock stands behind the city.",
          "Why Amasya grew in this valley becomes clearer.",
        ],
        fact:
          "Amasya Castle stands on Mount Harşena and opens a wide view over the Yeşilirmak valley.",
        localLine: "If you climb near sunset, the lights begin to turn on as you return.",
        choices: [
          { label: "Return to the night bank", nextId: "night-river" },
          { label: "Go down to the courtyard", nextId: "sehzade-courtyard" },
        ],
      },
    },
  },
  {
    id: "sehzade-courtyard",
    placeId: "bayezid-kulliyesi",
    clue: { tr: "Avlu duzeni", en: "Courtyard order" },
    copy: {
      tr: {
        title: "Avlu",
        kicker: "II. Bayezid Kulliyesi",
        text: [
          "Merkeze inince ses degisiyor.",
          "Kulliyenin avlusunda tas, golge ve olcu daha belirgin.",
          "Amasya yalniz yukaridan bakan kaya degil; avluda kendini toplayan bir sehir.",
        ],
        fact:
          "Amasya, Osmanli sehzadelerinin sancak tecrubesi kazandigi sehirlerden biriydi. II. Bayezid Kulliyesi bu merkezî dokunun onemli yapilarindandir.",
        localLine: "Avluda biraz durmak, yuruyerek gecmekten daha cok sey anlatir.",
        choices: [
          { label: "Sehzadeler izini sur", nextId: "princes" },
          { label: "Sokaklara gir", nextId: "streets" },
        ],
      },
      en: {
        title: "The Courtyard",
        kicker: "Sultan Bayezid II Külliye",
        text: [
          "Down in the centre, the sound changes.",
          "In the courtyard, stone, shade and proportion become clearer.",
          "Amasya is not only rock above; it is also a city gathered in courtyards.",
        ],
        fact:
          "Amasya was one of the cities where Ottoman princes gained provincial experience. The Sultan Bayezid II Külliye is a major part of that central fabric.",
        localLine: "Standing still in the courtyard says more than crossing it quickly.",
        choices: [
          { label: "Follow the princes' trace", nextId: "princes" },
          { label: "Enter the streets", nextId: "streets" },
        ],
      },
    },
  },
  {
    id: "princes",
    placeId: "sehzadeler",
    clue: { tr: "Sehzade izi", en: "Princes' trace" },
    copy: {
      tr: {
        title: "Sehzadeler",
        kicker: "Yonetmeyi ogrenenler",
        text: [
          "Sehzadeler meselesi tek bir binada durmuyor.",
          "Medrese, kulliye ve merkezdeki duzen birlikte dusunulunce anlam kazaniyor.",
          "Amasya'nin tarihi yalniz kayada degil, sehrin olcusunde de var.",
        ],
        fact:
          "Osmanli doneminde bazi sehzadeler yonetim tecrubesi icin Amasya'ya gonderildi.",
        localLine: "Bu bolumu merkez icinde baglantili bir rota gibi gez.",
        choices: [
          { label: "Eski sokaklara gir", nextId: "streets" },
          { label: "Gece kiyisina don", nextId: "night-river" },
        ],
      },
      en: {
        title: "Princes",
        kicker: "Learning to govern",
        text: [
          "The story of princes does not sit inside one building.",
          "It makes sense when the madrasa, külliye and centre are read together.",
          "Amasya's history is not only in the rock; it is also in the town's order.",
        ],
        fact:
          "During the Ottoman period, some princes were sent to Amasya to gain administrative experience.",
        localLine: "Walk this part as a connected route through the centre.",
        choices: [
          { label: "Enter the old streets", nextId: "streets" },
          { label: "Return to the night bank", nextId: "night-river" },
        ],
      },
    },
  },
  {
    id: "streets",
    placeId: "eski-sokaklar",
    clue: { tr: "Tas esik", en: "Stone threshold" },
    copy: {
      tr: {
        title: "Ara Sokaklar",
        kicker: "Kucuk olcek",
        text: [
          "Ana manzaradan cikinca sehir kuculuyor.",
          "Kapilar, tas esikler, dar gecisler ve pencere golgeleri daha fazla gorunur oluyor.",
          "Buyuk Amasya goruntusunun arkasinda bu gundelik olcek var.",
        ],
        fact:
          "Eski sokaklar geleneksel ev dokusunu ve gundelik sehir hayatini yakindan gosterir.",
        localLine: "Yan sokaklara kisa sapmalar yapmak iyi sonuc verir.",
        choices: [
          { label: "Bugunun sehrine bak", nextId: "daily-life" },
          { label: "Gece kiyisina don", nextId: "night-river" },
        ],
      },
      en: {
        title: "Side Streets",
        kicker: "Smaller scale",
        text: [
          "Away from the main view, the city becomes smaller.",
          "Doors, stone thresholds, narrow passages and window shadows become visible.",
          "Behind the grand Amasya image, this everyday scale remains.",
        ],
        fact:
          "The old streets show the traditional housing fabric and daily town life at close range.",
        localLine: "Brief turns into side streets often lead to better views.",
        choices: [
          { label: "Look at today's city", nextId: "daily-life" },
          { label: "Return to the night bank", nextId: "night-river" },
        ],
      },
    },
  },
  {
    id: "daily-life",
    placeId: "amasya-yasam",
    clue: { tr: "Aksam cayi", en: "Evening tea" },
    copy: {
      tr: {
        title: "Bugunun Sehri",
        kicker: "Carsi ve kiyı",
        text: [
          "Carsi tarafinda fotograf eski bir seyi anlatmaktan cikiyor.",
          "Tarih, gundelik hayatin icinde devam ediyor.",
          "Kiyida yuruyenler, cay icenler ve eve donenler ayni manzaranin parcasi.",
        ],
        fact:
          "Amasya'nin merkezinde tarihî doku ile gundelik hayat ic ice surer.",
        localLine: "Bir yerde oturup etrafa bakmak bazen yuruyusten daha iyi gelir.",
        choices: [
          { label: "Gece kiyisina don", nextId: "night-river" },
          { label: "Sehir disina cik", nextId: "borabay" },
        ],
      },
      en: {
        title: "The City Today",
        kicker: "Market and riverside",
        text: [
          "Near the market, the photograph stops feeling old.",
          "History continues inside daily life.",
          "People walking by the river, drinking tea and going home belong to the same view.",
        ],
        fact:
          "In central Amasya, historic fabric and daily life continue together.",
        localLine: "Sitting down and watching can be better than walking.",
        choices: [
          { label: "Return to the night bank", nextId: "night-river" },
          { label: "Leave the centre", nextId: "borabay" },
        ],
      },
    },
  },
  {
    id: "borabay",
    placeId: "borabay",
    clue: { tr: "Gol kenari", en: "Lakeside" },
    copy: {
      tr: {
        title: "Borabay",
        kicker: "Merkezden uzak",
        text: [
          "Merkezden uzaklasinca Amasya'nin sesi azalir.",
          "Borabay'da su bu kez akmaz; golun ustunde durur.",
          "Vadinin sikisik goruntusunden sonra bu aciklik iyi gelir.",
        ],
        fact:
          "Borabay Golu, Amasya merkezinin disinda orman icinde yer alan sakin bir doga duragidir.",
        localLine: "Gol kenari hizli gecilecek bir yer degil.",
        choices: [
          { label: "Ferhat yoluna don", nextId: "ferhat" },
          { label: "Gece kiyisina don", nextId: "night-river" },
        ],
      },
      en: {
        title: "Borabay",
        kicker: "Outside the centre",
        text: [
          "Away from the centre, the sound of Amasya lowers.",
          "At Borabay, water no longer runs; it rests on the lake.",
          "After the tight valley, this openness helps.",
        ],
        fact:
          "Borabay Lake is a calm nature stop outside central Amasya, set within forest.",
        localLine: "The lakeside should not be passed too quickly.",
        choices: [
          { label: "Return to Ferhat's route", nextId: "ferhat" },
          { label: "Return to the night bank", nextId: "night-river" },
        ],
      },
    },
  },
  {
    id: "ferhat",
    placeId: "ferhat-sirin",
    clue: { tr: "Su yolu", en: "Water channel" },
    copy: {
      tr: {
        title: "Ferhat'in Yolu",
        kicker: "Efsane ve emek",
        text: [
          "Ferhat ile Şirin burada yalniz ask diye anlatilmaz.",
          "Kayaya acilan yol ve su arayisi hikayeyi araziye baglar.",
          "Bu yuzden efsane, sehrin suslu bir eki degil; yerin icindeki bir izdir.",
        ],
        fact:
          "Ferhat ile Şirin anlatisi Amasya'da su yolu ve kaya ile birlikte anilir.",
        localLine: "Kayaya ve yolun yonune dikkat et; hikaye orada guclenir.",
        choices: [
          { label: "Gece kiyisina don", nextId: "night-river" },
          { label: "Defteri kapat", nextId: "final" },
        ],
      },
      en: {
        title: "Ferhat's Route",
        kicker: "Legend and labour",
        text: [
          "Ferhat and Şirin is not told here only as a love story.",
          "The cut through rock and the search for water tie it to the land.",
          "The legend is not decoration; it is a trace inside the place.",
        ],
        fact:
          "In Amasya, the tale of Ferhat and Şirin is remembered together with a water channel and rock.",
        localLine: "Watch the rock and the direction of the path; the story gains force there.",
        choices: [
          { label: "Return to the night bank", nextId: "night-river" },
          { label: "Close the notebook", nextId: "final" },
        ],
      },
    },
  },
  {
    id: "night-river",
    placeId: "gece-amasya",
    clue: { tr: "Gece yansimasi", en: "Night reflection" },
    copy: {
      tr: {
        title: "Gece Kiyisi",
        kicker: "Isiklar yaninca",
        text: [
          "Gece olunca fotograf degismis gibi durur.",
          "Evlerin isigi suya duser, kaya karanlikta daha buyuk gorunur.",
          "Aradigin yerin tek bir nokta degil, butun bu hizalar oldugunu anlarsin.",
        ],
        fact:
          "Gece Amasya'da Yeşilirmak yansimalari, Yaliboyu isiklari ve kaya silueti birlikte gorunur.",
        localLine: "Kiyida bir kac dakika durmak manzarayi yerine oturtur.",
        choices: [
          { label: "Defteri kapat", nextId: "final" },
          { label: "Son kez kopruye cik", nextId: "bridge-view" },
        ],
      },
      en: {
        title: "Night Bank",
        kicker: "When the lights turn on",
        text: [
          "At night, the photograph seems to change.",
          "House lights fall onto the water, and the rock looks larger in the dark.",
          "You understand that the place you searched for was not one point, but all these alignments.",
        ],
        fact:
          "At night in Amasya, Yeşilirmak reflections, Yaliboyu lights and the rock silhouette appear together.",
        localLine: "A few minutes by the water lets the view settle.",
        choices: [
          { label: "Close the notebook", nextId: "final" },
          { label: "Step onto the bridge once more", nextId: "bridge-view" },
        ],
      },
    },
  },
  {
    id: "final",
    placeId: "gece-amasya",
    clue: { tr: "Tamamlanan defter", en: "Completed notebook" },
    copy: {
      tr: {
        title: "Defter Kapandi",
        kicker: "Amasya'yi anlamak",
        text: [
          "Fotograftaki yer tek bir nokta degildi.",
          "Irmak, evler, kaya, avlu, sokak ve gece ayni sehirde birlesiyordu.",
          "Amasya'yi buldugunu sandigin anda, onu daha sakin hatirlamaya basladin.",
        ],
        fact:
          "Amasya'nin etkisi tek bir yapidan degil, nehir kiyisi ile dag yamaci arasindaki yakin iliskiden gelir.",
        localLine: "Defterde kalanlar, gezdigin yerlerin kisa izidir.",
        choices: [],
      },
      en: {
        title: "Notebook Closed",
        kicker: "Understanding Amasya",
        text: [
          "The place in the photograph was not a single point.",
          "River, houses, rock, courtyard, street and night belonged to the same city.",
          "Just when you thought you had found Amasya, you began to remember it more calmly.",
        ],
        fact:
          "Amasya's effect comes not from one monument, but from the close relation between the riverbank and mountain slope.",
        localLine: "The notebook keeps the short trace of where you walked.",
        choices: [],
      },
    },
  },
];

export const storyNodeMap = storyNodes.reduce((map, node) => {
  map[node.id] = node;
  return map;
}, {});

export const getStoryCopy = (node, locale = "tr") =>
  node?.copy?.[locale] || node?.copy?.tr || {};

export const getClue = (node, locale = "tr") =>
  node?.clue?.[locale] || node?.clue?.tr || "";
