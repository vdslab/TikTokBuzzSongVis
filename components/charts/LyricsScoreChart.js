import * as d3 from "d3";
export default function LyricsScoreChart({ feature }) {
  console.log(feature);
  const strokeColor = "#888";
  const x = 0;
  const width = 600;
  const height = 450;
  const line = d3
    .line()
    .x(({ x }) => x)
    .y(({ y }) => y);

  const Xscale = d3
    .scaleLinear()
    .domain([0, feature.lyrics_list.length - 1])
    .range([0, width])
    .nice();

  const Yscale = d3.scaleLinear().domain([0, 100]).range([0, height]).nice();

  const lines = feature.lyrics_list.map((section, idx) => {
    return {
      x: Xscale(idx),
      rhymeY: Yscale(section.rhyme_score),
      positiveY: Yscale(section.positive_score),
      color: "#0000",
      rhymeScore: section.rhyme_score,
      positiveScore: section.positive_score,
    };
  });

  const positiveLine = {
    label: "ポジティブ度",
    color: "pink",
    points: feature.lyrics_list.map((section, idx) => {
      return {
        x: Xscale(idx),
        y: Yscale(section.positive_score),
      };
    }),
    scores: feature.lyrics_list.map((section) => section.positive_score),
  };
  const rhymeLine = {
    label: "韻踏み度",
    color: "green",
    points: feature.lyrics_list.map((section, idx) => {
      return {
        x: Xscale(idx),
        y: Yscale(section.rhyme_score),
      };
    }),
    scores: feature.lyrics_list.map((section) => section.rhyme_score),
  };

  console.log(rhymeLine);

  const lines2 = [positiveLine, rhymeLine];
  console.log(lines2);
  return (
    <div>
      <div>LyricsScoreChart</div>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g stroke="black" strokeWidth="1">
          <line x1="0" y1="0" x2="0" y2="400"></line>
          <line x1="0" y1="0" x2={width} y2="0"></line>
          <line x1={width} y1="0" x2={width} y2="400"></line>
          <line x1="0" y1="400" x2={width} y2="400"></line>
        </g>
        <g>
          {lines2.map((item, i) => {
            return (
              <g key={i}>
                <path
                  d={line(item.points)}
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                  opacity="0.8"
                />
                {item.points.map((p, j) => {
                  /* console.log(i + "" + j); */
                  return (
                    <circle
                      key={i + "" + j}
                      cx={p.x}
                      cy={p.y}
                      r="5"
                      fill="red"
                    ></circle>
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
