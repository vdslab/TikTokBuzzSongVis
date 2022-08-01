import * as d3 from "d3";
import React, { useState } from "react";
import { useMemo } from "react";
export default function LyricsScoreChart({ feature }) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({});
  /*   console.log(feature); */
  const x = 0;

  const margin = {
    left: 50,
    right: 110,
    top: 20,
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
  /* console.log(xTicks); */

  const yTicks = Yscale.ticks(10).map((d) => {
    return {
      label: d,
      y: Yscale(d),
    };
  });
  /* console.log(yTicks); */
  const positiveLine = {
    label: "ポジティブ度",
    color: "pink",
    pointColor: "#ff00ff",
    pointFill: "#fff0f5",
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
    pointFill: "#f0ffff",
    points: feature.lyrics_list.map((section, idx) => {
      return {
        x: Xscale(idx),
        y: Yscale(section.rhyme_score),
      };
    }),
    scores: feature.lyrics_list.map((section) => section.rhyme_score),
  };

  /* console.log(rhymeLine); */

  const lines2 = [positiveLine, rhymeLine];

  function onHover(e) {
    setShow(true);
  }

  function changeInfo(labelName, index) {
    setInfo({ labelName: labelName, index: index });
  }
  console.log(lines2);
  console.log(show);
  console.log(info);
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
                              x={p.x + 10}
                              y={p.y - 35}
                              width="75"
                              height="20"
                              stroke={item.pointColor}
                              fill={item.pointFill}
                              fillOpacity={0.5}
                            />
                            <text
                              x={p.x + 10}
                              y={p.y - 25}
                              textAnchor="start"
                              dominantBaseline="central"
                              fontSize="10"
                              style={{ userSelect: "none" }}
                            >
                              {item.label}:{item.scores[j]}
                            </text>
                          </g>
                        )}
                    </g>
                  );
                })}
              </g>
            );
          })}
          <circle cx={contentWidth + 35} cy="-3" r="7" fill="#ff00ff"></circle>
          <text
            x={contentWidth + 43}
            y="-3"
            textAnchor="start"
            dominantBaseline="central"
            fontSize="9"
            fill="#333333"
            style={{ userSelect: "none" }}
          >
            ポジティブ度
          </text>
          <circle cx={contentWidth + 35} cy="13" r="7" fill="#00bfff"></circle>
          <text
            x={contentWidth + 43}
            y="13"
            textAnchor="start"
            dominantBaseline="central"
            fontSize="9"
            fill="#333333"
            style={{ userSelect: "none" }}
          >
            韻踏み度
          </text>
        </g>
      </svg>
    </div>
  );
}
