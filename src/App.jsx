import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import AudioController from "./components/AudioController";
import ExperiencePreloader from "./components/ExperiencePreloader";
import InteractiveStory from "./components/InteractiveStory";
import ScrollScrubScene from "./components/ScrollScrubScene";
import { mediaPath } from "./data/media";
import { heroAssets } from "./data/stops";
import {
  dayRouteIds,
  getPlaceCopy,
  getSoundHint,
  placeMap,
  places,
  uiCopy,
} from "./data/story";

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

const playbackSourcesFor = (video) => {
  if (!video?.endsWith(".mp4") || typeof window === "undefined") {
    return video ? [video] : [];
  }

  const useMobileVideo =
    window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(max-width: 760px)").matches;
  const optimized = video.replace(/\.mp4$/i, useMobileVideo ? "-mobile-v2.mp4" : "-scrub-1080.mp4");

  if (!useMobileVideo) {
    return optimized === video ? [video] : [optimized, video];
  }

  return [
    optimized,
    video.replace(/\.mp4$/i, "-mobile.mp4"),
    video,
  ].filter((source, index, sources) => source && sources.indexOf(source) === index);
};

function SceneMedia({ image, video, eager = false }) {
  const videoSources = playbackSourcesFor(video);

  return (
    <div className="scene-media" aria-hidden="true">
      {image && (
        <img
          src={image}
          alt=""
          loading={eager ? "eager" : "lazy"}
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      )}
      {videoSources.length > 0 && (
        <video
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          crossOrigin="anonymous"
          preload={eager ? "metadata" : "none"}
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        >
          {videoSources.map((source) => (
            <source key={source} src={source} type="video/mp4" />
          ))}
        </video>
      )}
    </div>
  );
}

function CinematicScene({
  texture = "water",
  image,
  video,
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
  eager = false,
}) {
  return (
    <motion.main className={`scene ${texture} ${align}`} {...pageMotion}>
      <SceneMedia image={image} video={video} eager={eager} />
      <div className="scene-vignette" aria-hidden="true" />
      <div className="scene-light" aria-hidden="true" />
      <div className="scene-grain" aria-hidden="true" />

      <section className="scene-content">
        {eyebrow && <p className="scene-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="scene-subtitle">{subtitle}</p>}
        {children}
      </section>
    </motion.main>
  );
}

function LanguageToggle({ locale, setLocale }) {
  return (
    <div className="language-toggle" aria-label="Language selection">
      {["tr", "en"].map((lang) => (
        <button
          key={lang}
          type="button"
          className={locale === lang ? "active" : ""}
          onClick={() => setLocale(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Layout({ children, locale, setLocale }) {
  const copy = uiCopy[locale].nav;

  return (
    <div className="site-shell">
      <header className="site-nav">
        <Link className="brand" to="/">
          <span>Amasya</span>
          <small>Suyun Hafizasi</small>
        </Link>
        <div className="nav-cluster">
          <nav aria-label="Ana navigasyon">
            <NavLink to="/">{copy.home}</NavLink>
            <NavLink to="/hikaye">{copy.story}</NavLink>
            <NavLink to="/deneyim">{copy.experience}</NavLink>
            <NavLink to="/kesfet">{copy.explore}</NavLink>
          </nav>
          <LanguageToggle locale={locale} setLocale={setLocale} />
        </div>
      </header>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </div>
  );
}

function HomePage({ locale }) {
  const copy = uiCopy[locale];

  return (
    <>
      <CinematicScene
        texture="water"
        image={heroAssets.heroImage}
        video={heroAssets.heroVideo}
        eyebrow={copy.home.eyebrow}
        title={copy.home.title}
        subtitle={copy.home.subtitle}
        eager
      >
        <div className="scene-actions">
          <Link className="scene-button primary" to="/hikaye">
            {copy.home.route}
          </Link>
          <Link className="scene-button" to="/deneyim">
            {copy.home.experience}
          </Link>
          <Link className="scene-button quiet" to="/kesfet">
            {copy.home.explore}
          </Link>
        </div>
      </CinematicScene>
      <ScrollScrubScene
        className="home-scrub"
        mp4Src={mediaPath("videos", "manzara-yavas-cekim.mp4")}
        posterSrc={mediaPath("images", "manzara-yavas-cekim.jpg")}
        hintLabels={copy.scrub}
      />
    </>
  );
}

function StoryPage({ locale, startJourney }) {
  const copy = uiCopy[locale];
  const dayStops = dayRouteIds.map((stopId) => placeMap[stopId]).filter(Boolean);
  const firstStop = dayStops[0];

  return (
    <CinematicScene
      texture="paper"
      eyebrow={copy.story.eyebrow}
      title={copy.story.title}
      subtitle={copy.story.subtitle}
    >
      <div className="day-route-preview">
        {dayStops.slice(0, 8).map((place, index) => {
          const text = getPlaceCopy(place, locale);
          return (
            <span key={place.id}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {text.name}
            </span>
          );
        })}
      </div>
      <div className="scene-actions">
        <Link
          className="scene-button primary"
          to={`/rota/${firstStop.id}`}
          onClick={() => startJourney(firstStop.id)}
        >
          {copy.story.start}
        </Link>
        <Link className="scene-button quiet" to="/kesfet">
          {copy.story.index}
        </Link>
      </div>
    </CinematicScene>
  );
}

function RoutePage({ locale, addToJourney }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const copy = uiCopy[locale];
  const place = placeMap[id] || placeMap.yesilirmak;
  const text = getPlaceCopy(place, locale);
  const currentIndex = dayRouteIds.indexOf(place.id);
  const textNext = text.next?.[0];
  const nextId =
    currentIndex >= 0 && currentIndex < dayRouteIds.length - 1
      ? dayRouteIds[currentIndex + 1]
      : textNext?.nextId || "final";
  const nextPlace = placeMap[nextId];
  const nextText = nextPlace ? getPlaceCopy(nextPlace, locale) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [place.id]);

  const goNext = () => {
    if (nextId === "final") {
      navigate("/final");
      return;
    }
    addToJourney(nextId);
    navigate(`/rota/${nextId}`);
  };

  return (
    <motion.main className="route-page" key={place.id} {...pageMotion}>
      <ScrollScrubScene
        place={place}
        captions={[]}
        className="route-scrub"
        hintLabels={copy.scrub}
      >
        <p className="scene-eyebrow">{text.eyebrow}</p>
        <h1>{text.name}</h1>
        <p className="scene-subtitle">{text.sceneLine}</p>
        <div className="scene-body route-note route-note-desktop">
          <p>{text.description}</p>
          <p className="local-tip">
            <span>{copy.route.localTip}</span>
            {text.tip}
          </p>
        </div>
        <details className="city-note">
          <summary>{copy.route.cityNote}</summary>
          <p>{text.description}</p>
          <p>{text.tip}</p>
        </details>
        <div className="scene-actions route-actions">
          <button className="scene-button primary" type="button" onClick={goNext}>
            {nextId === "final" ? copy.route.complete : textNext?.label || copy.route.continue}
          </button>
          {nextText && (
            <span className="next-stop">
              {copy.route.nextStop}: {nextText.name}
            </span>
          )}
        </div>
        <div className="scene-links">
          <button type="button" onClick={() => window.history.back()}>
            {copy.route.back}
          </button>
          <Link to="/kesfet">{copy.route.index}</Link>
        </div>
        <AudioController src={place.ambientSound} labels={copy.audio} />
      </ScrollScrubScene>
    </motion.main>
  );
}

function ExplorePage({ locale, addToJourney }) {
  const copy = uiCopy[locale];
  const orderedPlaces = dayRouteIds.map((stopId) => placeMap[stopId]).filter(Boolean);

  return (
    <motion.main className="explore-scene" {...pageMotion}>
      <div className="scene-vignette" aria-hidden="true" />
      <div className="scene-grain" aria-hidden="true" />
      <section className="explore-heading">
        <p className="scene-eyebrow">{copy.explore.eyebrow}</p>
        <h1>{copy.explore.title}</h1>
        <p>{copy.explore.subtitle}</p>
      </section>
      <section className="explore-list day-index">
        {orderedPlaces.map((place, index) => {
          const text = getPlaceCopy(place, locale);
          return (
            <Link
              className={`explore-item ${place.texture}`}
              key={place.id}
              to={`/rota/${place.id}`}
              onClick={() => addToJourney(place.id)}
            >
              <span>{String(index + 1).padStart(2, "0")} / {text.eyebrow}</span>
              <strong>{text.name}</strong>
              <small>{text.sceneLine}</small>
              <em>{copy.explore.sound}: {getSoundHint(place, locale)}</em>
            </Link>
          );
        })}
      </section>
    </motion.main>
  );
}

function FinalPage({ locale, journey, resetJourney }) {
  const copy = uiCopy[locale];
  const visited = useMemo(
    () => journey.map((id) => placeMap[id]).filter(Boolean),
    [journey]
  );

  return (
    <CinematicScene
      texture="night"
      eyebrow={copy.final.eyebrow}
      title={copy.final.title}
      subtitle={copy.final.subtitle}
      align="center"
    >
      <div className="visited-path">
        {(visited.length ? visited : places.slice(0, 4)).map((place) => (
          <span key={place.id}>{getPlaceCopy(place, locale).name}</span>
        ))}
      </div>
      <div className="scene-actions">
        <Link className="scene-button primary" to="/hikaye" onClick={resetJourney}>
          {copy.final.restart}
        </Link>
        <Link className="scene-button quiet" to="/kesfet">
          {copy.final.explore}
        </Link>
      </div>
    </CinematicScene>
  );
}

function AppRoutes() {
  const [journey, setJourney] = useState([]);
  const [locale, setLocale] = useState("tr");

  const addToJourney = (id) => {
    setJourney((current) => (current.includes(id) ? current : [...current, id]));
  };

  const startJourney = (id) => {
    setJourney([id]);
  };

  return (
    <Layout locale={locale} setLocale={setLocale}>
      <Routes>
        <Route path="/" element={<HomePage locale={locale} />} />
        <Route
          path="/hikaye"
          element={<StoryPage locale={locale} startJourney={startJourney} />}
        />
        <Route path="/deneyim" element={<InteractiveStory locale={locale} />} />
        <Route
          path="/rota/:id"
          element={<RoutePage locale={locale} addToJourney={addToJourney} />}
        />
        <Route
          path="/kesfet"
          element={<ExplorePage locale={locale} addToJourney={addToJourney} />}
        />
        <Route
          path="/final"
          element={
            <FinalPage locale={locale} journey={journey} resetJourney={() => setJourney([])} />
          }
        />
      </Routes>
    </Layout>
  );
}

export default function App() {
  const [mediaReady, setMediaReady] = useState(false);

  if (!mediaReady) {
    return <ExperiencePreloader onReady={() => setMediaReady(true)} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
