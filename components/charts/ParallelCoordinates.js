import * as d3 from "d3";
import { useMemo } from "react";

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
  // "total_positive_score",
  // "total_rhyme_score",
];

export function ParallelCoordinates({ songList }) {
  const margin = {
    left: 10,
    right: 10,
    top: 30,
    bottom: 15,
  };
  const contentWidth = 600;
  const contentHeight = 400;
  const parallelHeigth = contentHeight * 0.9;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const makeLinePath = d3
    .line()
    .x(({ x }) => x)
    .y(({ y }) => y);

  const colorScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range(["#FF00FF", "#00FFFF"]);

  const xTickScale = d3
    .scalePoint()
    .range([0, contentWidth])
    .padding(1)
    .domain(feature);

  const chart = useMemo(() => {
    //HACK
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

    //HACK
    const lines = [];
    for (const song of songList) {
      const fs = song.detail.music_feature;
      fs["total_positive_score"] =
        song.detail.lyrics_feature?.total_positive_score;
      fs["total_rhyme_score"] = song.detail.lyrics_feature?.total_rhyme_score;

      const items = feature.map((f) => {
        // undefどうしよう問題
        if (f === "total_positive_score" || f === "total_rhyme_score") {
          if (song.detail.lyrics_feature?.total_positive_score) {
            return {
              x: xTickScale(f),
              y: yTickScale[f](song.detail.lyrics_feature[f]),
            };
          } else if (song.detail.lyrics_feature?.total_rhyme_score) {
            return {
              x: xTickScale(f),
              y: yTickScale[f](song.detail.lyrics_feature[f]),
            };
          } else {
            return {
              x: xTickScale(f),
              y: 0,
            };
          }
        } else {
          return {
            x: xTickScale(f),
            y: yTickScale[f](song.detail.music_feature[f]),
          };
        }
      });

      lines.push({ point: items, color: colorScale(song.rank) });
    }
    return {
      lines: lines,
      yTicks: yTicks,
    };
  }, [songList, xTickScale, parallelHeigth, colorScale]);

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
                  <g
                    transform={`rotate(-40, ${xTickScale(
                      f
                    )},${parallelHeigth})translate(-10,5)`}
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
                    {chart.yTicks[f].map((tick) => {
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
          {chart.lines.map((l, i) => {
            return (
              <g key={i}>
                <path
                  d={makeLinePath(l.point)}
                  fill="none"
                  stroke={l.color}
                  strokeWidth="2"
                  opacity="0.5"
                />
              </g>
            );
          })}
          <g></g>
        </svg>
      </div>
    </div>
  );
}
