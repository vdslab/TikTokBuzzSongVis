import * as d3 from "d3";
import * as cloud from "d3-cloud";
import { useMemo } from "react";

const sampleData = [
  { word: "ヤツ", score: 0.06382978723404255, negaposi: 0 },
  { word: "君", score: 0.031914893617021274, negaposi: 0 },
  { word: "分類", score: 0.031914893617021274, negaposi: 0 },
  { word: "持っ", score: 0.031914893617021274, negaposi: 0 },
  { word: "がる", score: 0.02127659574468085, negaposi: 0 },
  { word: "習性", score: 0.02127659574468085, negaposi: 0 },
  { word: "ない", score: 0.02127659574468085, negaposi: 0 },
  { word: "キャ", score: 0.02127659574468085, negaposi: 0 },
  { word: "それ", score: 0.02127659574468085, negaposi: 0 },
  { word: "ん", score: 0.02127659574468085, negaposi: 0 },
  { word: "ちっ", score: 0.010638297872340425, negaposi: 0 },
  { word: "区別", score: 0.010638297872340425, negaposi: 0 },
  { word: "ジャンル", score: 0.010638297872340425, negaposi: 0 },
  { word: "分け", score: 0.010638297872340425, negaposi: 0 },
  { word: "ヒト", score: 0.010638297872340425, negaposi: 0 },
  { word: "ある", score: 0.010638297872340425, negaposi: 0 },
  { word: "とか", score: 0.010638297872340425, negaposi: 0 },
  { word: "世の中", score: 0.010638297872340425, negaposi: 0 },
  { word: "2", score: 0.010638297872340425, negaposi: 0 },
  { word: "種類", score: 0.010638297872340425, negaposi: -1.0 },
  { word: "人間", score: 0.010638297872340425, negaposi: 0 },
  { word: "いる", score: 0.010638297872340425, negaposi: 0 },
  { word: "言う", score: 0.010638297872340425, negaposi: 0 },
  { word: "君たち", score: 0.010638297872340425, negaposi: 0 },
  { word: "標的", score: 0.010638297872340425, negaposi: 0 },
  { word: "モテ", score: 0.010638297872340425, negaposi: 0 },
  { word: "やつ", score: 0.010638297872340425, negaposi: 0 },
  { word: "やる", score: 0.010638297872340425, negaposi: 0 },
  { word: "ヤッ", score: 0.010638297872340425, negaposi: 0 },
  { word: "陽", score: 0.010638297872340425, negaposi: 1.0 },
  { word: "ら", score: 0.010638297872340425, negaposi: 0 },
  { word: "落ち着か", score: 0.010638297872340425, negaposi: 1.0 },
  { word: "気付か", score: 0.010638297872340425, negaposi: 0 },
  { word: "本能", score: 0.010638297872340425, negaposi: 0 },
  { word: "外側", score: 0.010638297872340425, negaposi: 0 },
  { word: "覗い", score: 0.010638297872340425, negaposi: 0 },
  { word: "いか", score: 0.010638297872340425, negaposi: 0 },
  { word: "気分", score: 0.010638297872340425, negaposi: 0 },
  { word: "乗ら", score: 0.010638297872340425, negaposi: 0 },
  { word: "シンプル", score: 0.010638297872340425, negaposi: 0 },
  { word: "曖昧", score: 0.010638297872340425, negaposi: -1.0 },
  { word: "繊細", score: 0.010638297872340425, negaposi: 1.0 },
  { word: "不明瞭", score: 0.010638297872340425, negaposi: -1.0 },
  { word: "ナニカ", score: 0.010638297872340425, negaposi: 0 },
  { word: "出せ", score: 0.010638297872340425, negaposi: 0 },
  { word: "やっ", score: 0.010638297872340425, negaposi: 0 },
  { word: "イケ", score: 0.010638297872340425, negaposi: 0 },
  { word: "悟っ", score: 0.010638297872340425, negaposi: 0 },
  { word: "ふり", score: 0.010638297872340425, negaposi: 0 },
  { word: "スカ", score: 0.010638297872340425, negaposi: -1.0 },
  { word: "うち", score: 0.010638297872340425, negaposi: 0 },
  { word: "不安", score: 0.010638297872340425, negaposi: -1.0 },
  { word: "なっ", score: 0.010638297872340425, negaposi: 0 },
  { word: "ちゃっ", score: 0.010638297872340425, negaposi: 0 },
  { word: "する", score: 0.010638297872340425, negaposi: 0 },
  { word: "アンタ", score: 0.010638297872340425, negaposi: 0 },
  { word: "ギフテッド", score: 0.010638297872340425, negaposi: 0 },
  { word: "アタシ", score: 0.010638297872340425, negaposi: 0 },
  { word: "普通", score: 0.010638297872340425, negaposi: 0 },
  { word: "主婦", score: 0.010638297872340425, negaposi: 0 },
  { word: "良い", score: 0.010638297872340425, negaposi: 1.0 },
  { word: "素晴らしい", score: 0.010638297872340425, negaposi: 1.0 },
  { word: "不可能", score: 0.010638297872340425, negaposi: -1.0 },
  { word: "証明", score: 0.010638297872340425, negaposi: 0 },
  { word: "完成", score: 0.010638297872340425, negaposi: 1.0 },
  { word: "夢", score: 0.010638297872340425, negaposi: 0 },
  { word: "持て", score: 0.010638297872340425, negaposi: 0 },
  { word: "言っ", score: 0.010638297872340425, negaposi: 0 },
  { word: "無責任", score: 0.010638297872340425, negaposi: 0 },
  { word: "なり", score: 0.010638297872340425, negaposi: 0 },
  { word: "喰わ", score: 0.010638297872340425, negaposi: 0 },
  { word: "Habit", score: 0.010638297872340425, negaposi: 0 },
  { word: "捨てる", score: 0.010638297872340425, negaposi: 0 },
  { word: "度", score: 0.010638297872340425, negaposi: 0 },
  { word: "見え", score: 0.010638297872340425, negaposi: 0 },
  { word: "くる", score: 0.010638297872340425, negaposi: 0 },
  { word: "価値", score: 0.010638297872340425, negaposi: 1.0 },
];

const legend = [
  { value: -1, text: "ネガティブ" },
  { value: 0, text: "ノーマル" },
  { value: 1, text: "ポジティブ" },
];

export default function WordCloudChart({ feature }) {
  const margin = {
    left: 5,
    right: 55,
    top: 5,
    bottom: 5,
  };
  const contentWidth = 300;
  const contentHeight = 200;

  const svgWidth = margin.left + margin.right + contentWidth;
  const svgHeight = margin.top + margin.bottom + contentHeight;

  const sizeScale = d3
    .scaleLinear()
    .range([10, 100])
    .domain([
      sampleData[sampleData.length - 1]["score"],
      sampleData[0]["score"],
    ]);

  const colorScale = d3
    .scaleLinear()
    .domain([-1, 0, 1])
    .range(["#53befc", "#a3a3a3", "#fc77e8"]);

  const cloudData = sampleData.map((data) => {
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
    <div>
      WordCloud
      <svg
        viewBox={`${-margin.left} ${-margin.top} ${svgWidth} ${svgHeight}`}
        style={{
          border: "solid 0.1px",
          borderColor: "#BBBBBB",
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
          {chart.words.map((word) => {
            return (
              <g
                key={word}
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
  );
}
