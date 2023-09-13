const { useState, useEffect } = React;

const TAGS = [
  "HTML",
  "CSS",
  "JavaScript",
  "Typescript",
  "Tailwind",
  "React",
  "Bootstrap",
  "Figma",
  "Photoshop",
  "MongoDB",
  "Express",
];
const DURATION = 15000;
const ROWS = 4;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => (
  <div
    className="loop-slider"
    style={{
      "--duration": `${duration}ms`,
      "--direction": reverse ? "reverse" : "normal",
    }}
  >
    <div className="inner">
      {children}
      {children}
    </div>
  </div>
);

const Tag = ({ text }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);

const InfiniteScrollAnimation = () => {
  const [tagsList, setTagsList] = useState([]);

  useEffect(() => {
    setTagsList(
      Array.from({ length: ROWS }, (_, i) => (
        <InfiniteLoopSlider
          key={i}
          duration={random(DURATION - 5000, DURATION + 5000)}
          reverse={i % 2 === 1}
        >
          {shuffle(TAGS)
            .slice(0, TAGS_PER_ROW)
            .map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
        </InfiniteLoopSlider>
      ))
    );
  }, []);

  return (
    <div className="tag-list">
      {tagsList}
      <div className="fade" />
    </div>
  );
};

ReactDOM.createRoot(document.querySelector(".react-section")).render(
  <InfiniteScrollAnimation />
);
