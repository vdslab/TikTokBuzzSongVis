import * as d3 from "d3";
import { useMemo, useState } from "react";

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

function isFullWidthChar(str) {
  return str.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/);
}

export function ParallelCoordinates({ songList }) {
  const [selectedId, setSelectedId] = useState("");

  const margin = {
    left: 0,
    right: 30,
    top: 30,
    bottom: 15,
  };
  const contentWidth = 600;
  const contentHeight = 400;
  const parallelHeigth = contentHeight * 0.9;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;
  const graphPadding = 30;

  const makeLinePath = d3
    .line()
    .x(({ x }) => x)
    .y(({ y }) => y);

  // TINK:最低最大をrankに合わせるかどうか
  const colorScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range(["#00FFFF", "#FF00FF"]);

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
        .range([parallelHeigth, graphPadding])
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

      let title = song.detail.title;
      if (isFullWidthChar(title) && title.length > 7) {
        title = title.slice(0, 7) + "...";
      } else if (title.length > 15) {
        title = title.slice(0, 15) + "...";
      }

      lines.push({
        point: items,
        color: colorScale(song.rank),
        id: song["id"],
        title: title,
      });
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
          style={{ border: "solid 0px" }}
        >
          {/* レジェンド */}
          <g transform={`translate(${contentWidth - 150}, -5)`}>
            <text
              x={10}
              y={0}
              textAnchor="start"
              dominantBaseline="central"
              fontSize="12.5"
              style={{ userSelect: "none" }}
            >
              score
            </text>
            <text
              x={50}
              y={15}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              style={{ userSelect: "none" }}
            >
              0
            </text>
            <text
              x={150}
              y={15}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              style={{ userSelect: "none" }}
            >
              100
            </text>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor={colorScale(0)} />
              <stop offset="5%" stopColor={colorScale(5)} />
              <stop offset="10%" stopColor={colorScale(10)} />
              <stop offset="15%" stopColor={colorScale(15)} />
              <stop offset="20%" stopColor={colorScale(20)} />
              <stop offset="25%" stopColor={colorScale(25)} />
              <stop offset="30%" stopColor={colorScale(30)} />
              <stop offset="35%" stopColor={colorScale(35)} />
              <stop offset="40%" stopColor={colorScale(40)} />
              <stop offset="45%" stopColor={colorScale(45)} />
              <stop offset="50%" stopColor={colorScale(50)} />
              <stop offset="55%" stopColor={colorScale(55)} />
              <stop offset="60%" stopColor={colorScale(60)} />
              <stop offset="65%" stopColor={colorScale(65)} />
              <stop offset="70%" stopColor={colorScale(70)} />
              <stop offset="75%" stopColor={colorScale(75)} />
              <stop offset="80%" stopColor={colorScale(80)} />
              <stop offset="85%" stopColor={colorScale(85)} />
              <stop offset="90%" stopColor={colorScale(90)} />
              <stop offset="95%" stopColor={colorScale(95)} />
              <stop offset="100%" stopColor={colorScale(100)} />
            </linearGradient>
            <rect
              x={50}
              y={0 - 15 / 2}
              width="100"
              height="15"
              fill="url('#gradient')"
            />
          </g>
          {/** 軸 */}
          <g>
            {feature.map((f, i) => {
              return (
                <g key={i}>
                  <line
                    x1={xTickScale(f)}
                    y1={graphPadding}
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
                            x={xTickScale(f) - 25}
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
          {/* パス */}
          <g>
            {chart.lines.map((l, i) => {
              return (
                <g key={i}>
                  <path
                    d={makeLinePath(l.point)}
                    fill="none"
                    stroke={l.color}
                    strokeWidth="3"
                    opacity={
                      selectedId === "" ? 0.5 : selectedId === l.id ? 1.0 : 0.2
                    }
                    onMouseMove={(e) => {
                      setSelectedId(l.id);
                    }}
                    onMouseLeave={() => {
                      setSelectedId("");
                    }}
                  />
                  {selectedId !== "" && selectedId === l.id && (
                    <g>
                      <rect
                        x={contentWidth - 50 + 5}
                        y={l.point[l.point.length - 1].y - 15 / 2}
                        width="75"
                        height="15"
                        fill={l.color}
                        fillOpacity={0.5}
                      />
                      <text
                        x={contentWidth - 50 + 5}
                        y={l.point[l.point.length - 1].y}
                        textAnchor="start"
                        dominantBaseline="central"
                        fontSize="10"
                        style={{ userSelect: "none" }}
                      >
                        {l.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
