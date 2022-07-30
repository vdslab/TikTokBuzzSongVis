import * as d3 from "d3";

const feature = [
  "acousticness",
  "danceability",
  "duration_ms",
  "energy",
  "instrumentalness",
  "key",
  "liveness",
  "loudness",
  "mode",
  "speechiness",
  "tempo",
  "time_signature",
  "valence",
  "total_positive_score",
  "total_rhyme_score",
];

export function ParallelCoordinates({ songList }) {
  console.log(songList);
  const margin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  const contentWidth = 600;
  const contentHeight = 400;
  const parallelHeigth = contentHeight * 0.8;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const xTick = d3
    .scalePoint()
    .range([0, contentWidth])
    .padding(1)
    .domain(feature);

  return (
    <div>
      特徴量比較
      <div>
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 1px" }}
        >
          {/** x軸 */}
          <g>
            {feature.map((f, i) => {
              return (
                <g key={i}>
                  <line
                    x1={xTick(f)}
                    y1={0}
                    x2={xTick(f)}
                    y2={parallelHeigth}
                    stroke={"black"}
                  />
                  {/* TODO:微調整 */}
                  <g transform={`rotate(-40, ${xTick(f)},${parallelHeigth})`}>
                    <text
                      id={i}
                      x={xTick(f)}
                      y={parallelHeigth}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="15"
                      style={{ userSelect: "none" }}
                    >
                      {f}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
          {/* y軸 */}
          <g></g>
        </svg>
      </div>
    </div>
  );
}
