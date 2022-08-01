import * as d3 from "d3";
/* import { color } from "d3"; */
export default function LyricsScoreChart({ feature }) {
  console.log(feature);
  const strokeColor = "#888";
  const x = 0;

  const margin = {
    left: 50,
    right: 60,
    top: 10,
    bottom: 50,
  };
  const contentWidth = 600;
  const contentHeight = 450;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const line = d3
    .line()
    .x(({ x }) => x)
    .y(({ y }) => y);

  const Xscale = d3
    .scaleLinear()
    .domain([0, feature.lyrics_list.length - 1])
    .range([0, contentWidth])
    .nice();

  const Yscale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([contentHeight, 0])
    .nice();

  const xTicks = Xscale.ticks(feature.lyrics_list.length - 1).map((d) => {
    return {
      label: "section" + (d + 1),
      x: Xscale(d),
    };
  });
  console.log(xTicks);

  const yTicks = Yscale.ticks(10).map((d) => {
    return {
      label: d,
      y: Yscale(d),
    };
  });
  console.log(yTicks);

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
  console.log(lines);

  const positiveLine = {
    label: "ポジティブ度",
    color: "pink",
    pointColor: "#ff00ff",
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
    color: "#00bfff",
    pointColor: "blue",
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
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{
          border: "solid 0.1px",
          borderColor: "#BBBBBB",
        }}
      >
        <g stroke="black" strokeWidth="1">
          <line x1="0" y1="0" x2="0" y2={contentHeight}></line>
          <line
            x1="0"
            y1={contentHeight}
            x2={contentWidth}
            y2={contentHeight}
          ></line>
        </g>
        <g>
          {xTicks.map((tick) => {
            return (
              <g key={tick.x}>
                <line
                  x1={tick.x}
                  y1={contentHeight - 10}
                  x2={tick.x}
                  y2={contentHeight + 10}
                  stroke={"black"}
                />
                <text
                  x={tick.x}
                  y={contentHeight + 20}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  style={{ userSelect: "none" }}
                >
                  {tick.label}
                </text>
              </g>
            );
          })}

          {yTicks.map((tick) => {
            return (
              <g key={tick.y}>
                <line x1="-5" y1={tick.y} x2="5" y2={tick.y} stroke={"black"} />
                <text
                  x="-15"
                  y={tick.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  style={{ userSelect: "none" }}
                >
                  {tick.label}
                </text>
              </g>
            );
          })}
        </g>
        <g>
          {lines2.map((item, i) => {
            return (
              <g key={i}>
                <path
                  d={line(item.points)}
                  fill="none"
                  stroke={item.color}
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
                      fill={item.pointColor}
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
