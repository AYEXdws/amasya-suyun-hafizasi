import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import AudioController from "./components/AudioController";
import FrameScrubScene from "./components/FrameScrubScene";
import ScrollScrubScene from "./components/ScrollScrubScene";
import { mediaAssetPath, mediaPath } from "./data/media";
import { heroAssets } from "./data/stops";
import {
  dayRouteIds,
  getPlaceCopy,
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

function useMobileMediaQuery() {
  const [isMobileMedia, setIsMobileMedia] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const sync = () => setIsMobileMedia(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isMobileMedia;
}

function SceneMedia({ image, video, mobileVideo, eager = false }) {
  const isMobileMedia = useMobileMediaQuery();
  const activeVideo = isMobileMedia && mobileVideo ? mobileVideo : video;
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoReady(false);
    setVideoFailed(false);
  }, [activeVideo]);

  return (
    <div className="scene-media" aria-hidden="true">
      {activeVideo && !videoReady && !videoFailed && <div className="scene-media-placeholder" />}
      {image && (!activeVideo || videoFailed) && (
        <img
          src={image}
          alt=""
          loading={eager ? "eager" : "lazy"}
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      )}
      {activeVideo && (
        <video
          key={activeVideo}
          src={activeVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={videoReady ? "is-ready" : ""}
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 0;
          }}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onError={(event) => {
            setVideoFailed(true);
            event.currentTarget.hidden = true;
          }}
        />
      )}
    </div>
  );
}

function CinematicScene({
  texture = "water",
  image,
  video,
  mobileVideo,
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
  eager = false,
}) {
  return (
    <motion.main className={`scene ${texture} ${align}`} {...pageMotion}>
      <SceneMedia image={image} video={video} mobileVideo={mobileVideo} eager={eager} />
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

function Layout({ children, locale }) {
  const copy = uiCopy[locale].nav;

  return (
    <div className="site-shell">
      <header className="site-nav">
        <Link className="brand" to="/">
          <span>Amasya</span>
          <small>Suyun Hafızası</small>
        </Link>
        <div className="nav-cluster">
          <nav aria-label="Ana navigasyon">
            <NavLink to="/">{copy.home}</NavLink>
            <NavLink to="/hikaye">{copy.story}</NavLink>
            <NavLink to="/kesfet">{copy.explore}</NavLink>
          </nav>
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
        mobileVideo={heroAssets.heroMobileVideo}
        eyebrow={copy.home.eyebrow}
        title={copy.home.title}
        subtitle={copy.home.subtitle}
        eager
      >
        <div className="scene-actions">
          <Link className="scene-button primary" to="/hikaye">
            {copy.home.route}
          </Link>
          <Link className="scene-button quiet" to="/kesfet">
            {copy.home.explore}
          </Link>
        </div>
      </CinematicScene>
      <FrameScrubScene
        className="home-scrub"
        frameBaseUrl={mediaAssetPath("frames", "manzara-yavas-cekim")}
        frameCount={202}
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
    if (id === "borabay" || id === "bora-boy") {
      navigate("/rota/boraboy", { replace: true });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id, navigate, place.id]);

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
  const locale = "tr";

  useEffect(() => {
    document.documentElement.lang = "tr";
    document.documentElement.setAttribute("translate", "no");
    document.body.setAttribute("translate", "no");
  }, []);

  const addToJourney = (id) => {
    setJourney((current) => (current.includes(id) ? current : [...current, id]));
  };

  const startJourney = (id) => {
    setJourney([id]);
  };

  return (
    <Layout locale={locale}>
      <Routes>
        <Route path="/" element={<HomePage locale={locale} />} />
        <Route
          path="/hikaye"
          element={<StoryPage locale={locale} startJourney={startJourney} />}
        />
        <Route
          path="/rota/:id"
          element={<RoutePage locale={locale} addToJourney={addToJourney} />}
        />
        <Route
          path="/kesfet"
          element={<ExplorePage locale={locale} addToJourney={addToJourney} />}
        />
        <Route path="/deneyim" element={<Navigate to="/hikaye" replace />} />
        <Route
          path="/final"
          element={
            <FinalPage locale={locale} journey={journey} resetJourney={() => setJourney([])} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
