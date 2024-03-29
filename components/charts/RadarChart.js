import React, { useMemo, useState } from "react";
import style from "./RadarChart.module.css";
import { Grid } from "@material-ui/core";

const featureFeature = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "loudness",
  "speechiness",
  "valence",
];

const keyDictEng = {
  0: "C",
  1: "#C/♭D",
  2: "D",
  3: "#D/♭E",
  4: "E",
  5: "F",
  6: "#F/♭G",
  7: "G",
  8: "#G/♭A",
  9: "A",
  10: "#A/♭B",
  11: "B",
};

function RaderChart({ feature }) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({});

  const posX = 50;
  const posY = 50;
  const r = 50;

  const margin = {
    left: 55,
    right: 0,
    top: 25,
    bottom: 5,
  };
  //ここいじる
  const contentWidth = 280;
  const contentHeight = 230;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  // レーダーチャートのデータ作成
  const chart = useMemo(() => {
    const len = featureFeature.length;
    const rs = [r, r * 0.8, r * 0.6, r * 0.4, r * 0.2];

    let perimeters = ["", "", "", "", ""];
    const perimetersPoint = [];
    const tick = [];
    let score = "";
    const scorePoint = [];
    const c = Math.PI / 180;

    for (let _r = 0; _r < rs.length; _r++) {
      for (let i = 0; i <= len; i++) {
        let key = featureFeature[i];
        if (i === len) {
          key = featureFeature[0];
        }
        const x = posX + rs[_r] * Math.cos(((360 / len) * i - 90) * c);
        const y = posY + rs[_r] * Math.sin(((360 / len) * i - 90) * c);
        if (i !== 0) {
          perimeters[_r] += "L " + x + "," + y + " ";
        } else {
          perimeters[_r] += "M " + x + "," + y + " ";
          tick.push({ x: x, y: y, value: (1 - _r / 5).toFixed(1) });
        }
        if (i === len) {
          perimeters[_r] += "z";
        }

        if (rs[_r] === r && feature !== null) {
          let value = feature[key]?.toFixed(3);

          if (key === "loudness") {
            value = ((feature?.loudness + 60) / 60).toFixed(3);
          }

          const xs = posX + r * value * Math.cos(((360 / len) * i - 90) * c);
          const ys = posY + r * value * Math.sin(((360 / len) * i - 90) * c);

          if (i !== 0) {
            score += "L " + xs + "," + ys + " ";
          } else {
            score += "M " + xs + "," + ys + " ";
          }
          if (i === len) {
            score += "z";
          } else {
            scorePoint.push({ x: xs, y: ys, name: key, value: value });
            perimetersPoint.push({
              x: x,
              y: y,
              name: key,
              legend: false,
              value: value,
            });
            const xp =
              posX + rs[_r] * 1.2 * Math.cos(((360 / len) * i - 90) * c);
            const yp =
              posY + rs[_r] * 1.15 * Math.sin(((360 / len) * i - 90) * c);
            perimetersPoint.push({ x: xp, y: yp, name: key, legend: true });
          }
        }
      }
    }
    return {
      perimeters: perimeters,
      perimetersPoint: perimetersPoint,
      tick: tick,
      scorePoint: scorePoint,
      score: score,
    };
  }, [feature]);

  function onHover(e) {
    setShow(true);
  }

  function changeInfo(feature, value) {
    setInfo({ feature: feature, value: value });
  }

  return (
    <div>
      <div className={style.title}>音楽特徴量</div>
      <div className={style.contents}>
        <Grid container>
          {/* レジェンド */}
          <Grid item xs={2}>
            <Grid item>テンポ：{Math.floor(feature.tempo)}</Grid>
            <Grid item>拍子：{feature.time_signature}</Grid>
            <Grid item>
              調：{keyDictEng[feature.key]}
              {feature?.mode == 0 ? "minor" : "major"}
            </Grid>
          </Grid>
          {/* チャート */}
          <Grid item xs={10}>
            <div className={style.chart}>
              <svg
                viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
                className={style.content}
              >
                <g transform={`scale(2)`}>
                  {chart.perimeters.map((d, i) => {
                    return (
                      <g key={i}>
                        <path
                          fill="none"
                          stroke="lightgray"
                          d={d}
                          strokeWidth="0.5"
                        />
                      </g>
                    );
                  })}

                  {chart.perimetersPoint.map((p, i) => {
                    return (
                      <g key={i}>
                        {!p.legend ? (
                          <line
                            x1={posX}
                            y1={posY}
                            x2={p.x}
                            y2={p.y}
                            id={p.name + " " + p.value}
                            stroke="lightgray"
                            strokeWidth="0.5"
                            onMouseMove={(e) => {
                              onHover(e);
                            }}
                            onMouseLeave={() => {
                              setShow(false);
                            }}
                          />
                        ) : (
                          <g>
                            {p.name !== "speechiness" ? (
                              <text
                                x={p.x}
                                y={p.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="5"
                                style={{ userSelect: "none" }}
                              >
                                {p.name}
                              </text>
                            ) : (
                              <g>
                                {p.name !== "speechiness" ? (
                                  <text
                                    x={p.x}
                                    y={p.y}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize="5"
                                    style={{ userSelect: "none" }}
                                  >
                                    {p.name}
                                  </text>
                                ) : (
                                  <text
                                    x={p.x + 10}
                                    y={p.y}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize="5"
                                    style={{ userSelect: "none" }}
                                  >
                                    {p.name}
                                  </text>
                                )}
                              </g>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}
                  {chart.tick.map((t, i) => {
                    return (
                      <g key={i}>
                        <text
                          x={t.x}
                          y={t.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="5"
                          style={{ userSelect: "none" }}
                        >
                          {t.value}
                        </text>
                      </g>
                    );
                  })}

                  <path
                    fill="#fed52c"
                    fillOpacity="0.5"
                    stroke="#fed52c"
                    strokeWidth="0.5"
                    d={chart.score}
                  />
                  {chart.scorePoint.map((p, i) => {
                    return (
                      <g key={i}>
                        <circle
                          className="test"
                          id={p.name + " " + p.value}
                          cx={p.x}
                          cy={p.y}
                          r={1.8}
                          fill="white"
                          fillOpacity={0.6}
                          stroke="#fe932c"
                          strokeWidth={0.5}
                          onMouseMove={(e) => {
                            onHover(e);
                            changeInfo(p.name, p.value);
                          }}
                          onMouseLeave={() => {
                            setShow(false);
                          }}
                        />
                      </g>
                    );
                  })}
                  <g>
                    {chart.scorePoint.map((p, i) => {
                      return (
                        <g key={i}>
                          {show && info.feature === p.name && (
                            <g>
                              <rect
                                x={p.x - 23 / 2}
                                y={p.y - 15}
                                width="23"
                                height="10"
                                fill="#fffcf9"
                                stroke="#fe932c"
                                strokeWidth={0.5}
                                fillOpacity={0.8}
                              />
                              <text
                                id={p.name + " " + p.value}
                                x={p.x}
                                y={p.y - 10}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="5"
                                style={{ userSelect: "none" }}
                              >
                                {p.value}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </g>
              </svg>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default RaderChart;
