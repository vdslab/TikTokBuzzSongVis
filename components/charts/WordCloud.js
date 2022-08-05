import * as d3 from "d3";
import * as cloud from "d3-cloud";
import { useMemo } from "react";
import style from "./WordCloud.module.css";

const legend = [
  { value: 1, text: "ポジティブ" },
  { value: 0, text: "ノーマル" },
  { value: -1, text: "ネガティブ" },
];

export default function WordCloudChart({ feature }) {
  console.log(feature);
  const margin = {
    left: 5,
    right: 55,
    top: 5,
    bottom: 5,
  };
  const contentWidth = 380;
  const contentHeight = 330;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const sizeScale = d3
    .scaleLinear()
    .range([30, 90])
    .domain([feature[feature.length - 1]["score"], feature[0]["score"]]);

  const colorScale = d3
    .scaleLinear()
    .domain([-1, 0, 1])
    .range(["#0CCCC7", "#a3a3a3", "#FE2C55"]);

  const cloudData = feature.map((data) => {
    return {
      word: data.word,
      size: sizeScale(data.score),
      color: colorScale(data.negaposi),
    };
  });

  const chart = useMemo(() => {
    //HACK:これでええんか？
    if (typeof window === "object") {
      const layout = cloud()
        .size([contentWidth, contentHeight])
        .words(
          cloudData.map((d) => {
            return { text: d.word, size: d.size, color: d.color };
          })
        )
        .rotate(function () {
          return ~~(Math.random() * 2) * 90;
        })
        .fontSize(function (d) {
          return d.size;
        });
      layout.start();

      return {
        words: layout.words(),
      };
    }
    return {
      words: [],
    };
  }, [cloudData]);

  return (
    <div className={style.title_chart} style={{ width: 380 }}>
      <div className={style.title}>WordCloud</div>
      <div className="chart">
        {" "}
        <svg
          viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
          style={{
            border: "solid 0.1px",
            borderColor: "#BBBBBB",
            height: "300px",
          }}
        >
          {legend.map((l, i) => {
            return (
              <g key={l.text}>
                <rect
                  x={contentWidth}
                  y={10 + 15 * i}
                  width="10"
                  height="10"
                  fill={colorScale(l.value)}
                />
                <text
                  x={contentWidth + 12.5}
                  y={10 + 15 * i + 10 / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                  fontSize="7.5"
                  fill="#333333"
                  style={{ userSelect: "none" }}
                >
                  {l.text}
                </text>
              </g>
            );
          })}
          <g transform={`translate(${contentWidth / 2},${contentHeight / 2})`}>
            {chart.words.map((word, i) => {
              return (
                <g
                  key={i}
                  transform={`translate(${word.x},${word.y})rotate(${word.rotate})`}
                >
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    fontSize={word.size}
                    fill={word.color}
                    fontFamily="Impact"
                    style={{ userSelect: "none" }}
                  >
                    {word.text}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
