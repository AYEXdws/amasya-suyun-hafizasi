import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  getClue,
  getStoryCopy,
  storyNodeMap,
  storyStartId,
  storyUi,
} from "../data/interactiveStory";
import { placeMap } from "../data/story";

const unique = (items) => [...new Set(items.filter(Boolean))];

export default function InteractiveStory({ locale = "tr" }) {
  const [nodeId, setNodeId] = useState(storyStartId);
  const [notebook, setNotebook] = useState([]);
  const [path, setPath] = useState([storyStartId]);
  const node = storyNodeMap[nodeId] || storyNodeMap[storyStartId];
  const copy = getStoryCopy(node, locale);
  const ui = storyUi[locale] || storyUi.tr;
  const place = placeMap[node.placeId] || placeMap.yesilirmak;
  const isFinal = node.id === "final";

  const collected = useMemo(() => unique(notebook), [notebook]);
  const progress = Math.min(100, Math.round((collected.length / 9) * 100));

  const choose = (nextId) => {
    setNotebook((current) => unique([...current, getClue(node, locale)]));
    setNodeId(nextId);
    setPath((current) => [...current, nextId]);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const restart = () => {
    setNodeId(storyStartId);
    setNotebook([]);
    setPath([storyStartId]);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <motion.main className={`interactive-story ${place.texture}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="interactive-media" aria-hidden="true">
        {place.video && (
          <video
            key={place.video}
            src={place.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
        )}
      </div>
      <div className="interactive-vignette" aria-hidden="true" />
      <div className="interactive-grain" aria-hidden="true" />

      <aside className="story-notebook" aria-label="Toplanan defter notları">
        <span>{ui.notebook}</span>
        <strong>{collected.length}</strong>
        <div className="notebook-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
      </aside>

      <section className="interactive-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="scene-eyebrow">{copy.kicker}</p>
            <h1>{copy.title}</h1>
            <div className="story-lines">
              {copy.text.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="story-fact">
              <span>{ui.cityNote}</span>
              <p>{copy.fact}</p>
              <small>{copy.localLine}</small>
            </div>

            {isFinal && (
              <div className="notebook-list">
                {unique([...collected, getClue(node, locale)]).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}

            <div className="story-choices">
              {copy.choices.map((choice) => (
                <button key={choice.nextId} type="button" onClick={() => choose(choice.nextId)}>
                  {choice.label}
                </button>
              ))}
              {isFinal && (
                <button type="button" onClick={restart}>
                  {ui.restart}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="story-path" aria-label="Hikaye yolu">
        {path.slice(-6).map((visitedId, index) => {
          const visited = storyNodeMap[visitedId];
          return <span key={`${visitedId}-${index}`}>{getStoryCopy(visited, locale).title}</span>;
        })}
      </div>
    </motion.main>
  );
}
