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
    left: 30,
    right: 0,
    top: 30,
    bottom: 0,
  };
  const contentWidth = 600;
  const contentHeight = 400;
  const parallelHeigth = contentHeight * 0.8;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const xTickScale = d3
    .scalePoint()
    .range([0, contentWidth])
    .padding(1)
    .domain(feature);

  const yTickScale = {};
  const yTicks = {};
  for (const i in feature) {
    yTickScale[feature[i]] = d3
      .scaleLinear()
      .domain(
        d3.extent(
          songList.map((song) => {
            if (
              feature[i] !== "total_positive_score" &&
              feature[i] !== "total_rhyme_score" &&
              song.detail.music_feature !== null
            ) {
              return song.detail?.music_feature[feature[i]];
            } else if (song.detail.lyrics_feature !== null) {
              return song.detail?.lyrics_feature[feature[i]];
            }
          })
        )
      )
      .range([parallelHeigth, 0])
      .nice();

    //FIXME:数が合わない
    yTicks[feature[i]] = yTickScale[feature[i]].ticks(10).map((d) => {
      if (feature[i] === "duration_ms") {
        return { label: d / 1000, y: yTickScale[feature[i]](d) };
      }
      return { label: d, y: yTickScale[feature[i]](d) };
    });
  }

  console.log(yTicks);

  return (
    <div>
      特徴量比較
      <div>
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{ border: "solid 1px" }}
        >
          {/** 軸 */}
          <g>
            {feature.map((f, i) => {
              return (
                <g key={i}>
                  <line
                    x1={xTickScale(f)}
                    y1={0}
                    x2={xTickScale(f)}
                    y2={parallelHeigth}
                    stroke={"black"}
                  />
                  {/* TODO:微調整 */}
                  <g
                    transform={`translate(0,0) rotate(-40, ${xTickScale(
                      f
                    )},${parallelHeigth})`}
                  >
                    <text
                      id={i}
                      x={xTickScale(f)}
                      y={parallelHeigth}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10"
                      style={{ userSelect: "none" }}
                    >
                      {f === "duration_ms" ? "duration_s" : f}
                    </text>
                  </g>
                  <g>
                    {yTicks[f].map((tick) => {
                      return (
                        <g key={tick.y}>
                          <line
                            x1={xTickScale(f) - 10}
                            y1={tick.y}
                            x2={xTickScale(f)}
                            y2={tick.y}
                            stroke={"black"}
                          />
                          <text
                            x={xTickScale(f) - 20}
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
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
