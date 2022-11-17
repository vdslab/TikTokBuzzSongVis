import * as d3 from "d3";
import React, { useState, useMemo } from "react";
import style from "./LyricsScoreChart.module.css";

function Tooltip({ show, idx, feature, closeLyricsShow }) {
  return (
    <div>
      {show && (
        <div id="tooltip" className={style.absolute}>
          <div className={style.close_button_area} onClick={closeLyricsShow}>
            <div className={style.close_button}>close</div>
          </div>
          <div className={style.lyric_box}>
            <div className={style.lyric}>
              {feature.lyrics_list[idx].text.map((line, i) => {
                return <div key={i}>{line}</div>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LyricsScoreChart({ feature }) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({});
  const [lyricShow, setLyricShow] = useState(false);
  const [lyricsIdx, setLyricsIdx] = useState(-1);

  const margin = {
    left: 50,
    right: 110,
    top: 35,
    bottom: 50,
  };
  const contentWidth = 600;
  const contentHeight = 200;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  function closeLyricsShow() {
    setLyricShow(false);
    setLyricsIdx(-1);
  }

  const line = d3
    .line()
    .x(({ x }) => x)
    .y(({ y }) => y);

  const Yscale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([contentHeight, 0])
    .nice();

  const yTicks = Yscale.ticks(5).map((d) => {
    return {
      label: d,
      y: Yscale(d),
    };
  });

  function onHover(e) {
    setShow(true);
  }

  function changeInfo(labelName, index) {
    setInfo({ labelName: labelName, index: index });
  }

  const chart = useMemo(() => {
    const Xscale = d3
      .scaleLinear()
      .domain([0, feature.lyrics_list.length - 1])
      .range([0, contentWidth])
      .nice();

    const xTicks = Xscale.ticks(feature.lyrics_list.length - 1).map((d) => {
      return {
        label: "section" + (d + 1),
        x: Xscale(d),
      };
    });

    // FIXME:スコアが振り切る時があるのでバックエンドで修正する
    const positiveLine = {
      label: "ポジティブ度",
      color: "rgb(255, 107, 43, 0.5)",
      pointColor: "#FF6B2B",
      pointFill: "#fff5f1",
      points: feature.lyrics_list.map((section, idx) => {
        return {
          x: Xscale(idx),
          y: Yscale(
            section.positive_score > 100 ? 100 : section.positive_score
          ),
        };
      }),
      scores: feature.lyrics_list.map((section) =>
        section.positive_score > 100 ? 100 : section.positive_score
      ),
    };
    const rhymeLine = {
      label: "韻踏み度",
      color: "rgb(255, 213, 43, 0.5)",
      pointColor: "#FFD52B",
      pointFill: "#fffcf1",
      points: feature.lyrics_list.map((section, idx) => {
        return {
          x: Xscale(idx),
          y: Yscale(section.rhyme_score > 100 ? 100 : section.rhyme_score),
        };
      }),
      scores: feature.lyrics_list.map((section) =>
        section.rhyme_score > 100 ? 100 : section.rhyme_score
      ),
    };
    const lines2 = [positiveLine, rhymeLine]; /* 0番目にポジ,1番目に韻 */

    if (rhymeLine.scores.indexOf(null) !== -1) {
      lines2.pop();
    }

    if (positiveLine.scores.indexOf(null) !== -1) {
      lines2.shift();
    }
    return {
      Xscale,
      xTicks,
      lines2,
    };
  }, [feature, Yscale]);

  function hasData(name, list) {
    return list.some((item) => {
      if (item.label === name) {
        return item.points.length > 0;
      }
      return false;
    });
  }

  return (
    <div>
      <div className={style.title}>ポジティブ度&韻踏み度</div>
      <div className={style.detail}>
        <div style={{ paddingRight: "0.75rem" }}>
          ポジティブ度：
          {hasData("ポジティブ度", chart.lines2)
            ? feature.total_positive_score
            : "不明"}
        </div>
        <div style={{ paddingRight: "0.75rem" }}>
          韻踏み度：
          {hasData("韻踏み度：", chart.lines2)
            ? feature.total_rhyme_score
            : "不明"}
        </div>
      </div>
      <div className={style.relative}>
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
            {chart.xTicks.map((tick, i) => {
              return (
                <g key={tick.x}>
                  <line
                    x1={tick.x}
                    y1={contentHeight - 5}
                    x2={tick.x}
                    y2={contentHeight + 5}
                    stroke={"black"}
                  />
                  <text
                    x={tick.x}
                    y={contentHeight + 20}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={lyricsIdx === i ? "orange" : "black"}
                    fontSize="10"
                    style={{ userSelect: "none" }}
                    onMouseMove={(e) => {
                      setLyricsIdx(i);
                    }}
                    onMouseUp={(e) => {
                      setLyricShow(true);
                      setLyricsIdx(i);
                    }}
                  >
                    {tick.label}
                  </text>
                </g>
              );
            })}

            {yTicks.map((tick) => {
              return (
                <g key={tick.y}>
                  <line
                    x1="-5"
                    y1={tick.y}
                    x2="5"
                    y2={tick.y}
                    stroke={"black"}
                  />
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
            {chart.lines2.map((item, i) => {
              return (
                <g key={i}>
                  <path
                    d={line(item.points)}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="3"
                    opacity="0.8"
                  />
                  {item.points.map((p, j) => {
                    return (
                      <g key={i + "" + j}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="7"
                          fill={item.pointColor}
                          onMouseMove={(e) => {
                            onHover(e);
                            changeInfo(item.label, j);
                          }}
                          onMouseLeave={() => {
                            setShow(false);
                          }}
                        ></circle>
                        {show === true &&
                          info.labelName === item.label &&
                          info.index === j && (
                            <g>
                              <rect
                                x={p.x + 5}
                                y={p.y - 30}
                                width="90"
                                height="20"
                                stroke={item.pointColor}
                                fill={item.pointFill}
                                fillOpacity={0.5}
                              />
                              <text
                                x={p.x + 50}
                                y={p.y - 20}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="9"
                                style={{ userSelect: "none" }}
                              >
                                {item.label}：{item.scores[j]}
                              </text>
                            </g>
                          )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
            {chart.lines2.map((item, index) => {
              if (hasData(item.label, chart.lines2)) {
                return (
                  <g key={item.label}>
                    <circle
                      cx={contentWidth + 35}
                      cy={-3 + 15 * index}
                      r="5"
                      fill={item.pointColor}
                    ></circle>
                    <text
                      x={contentWidth + 43}
                      y={-3 + 15 * index}
                      textAnchor="start"
                      dominantBaseline="central"
                      fontSize="9"
                      style={{ userSelect: "none" }}
                    >
                      ポジティブ度
                    </text>
                  </g>
                );
              }
            })}
          </g>
        </svg>
        <Tooltip
          show={lyricShow}
          idx={lyricsIdx}
          feature={feature}
          closeLyricsShow={closeLyricsShow}
        />
      </div>
    </div>
  );
}
