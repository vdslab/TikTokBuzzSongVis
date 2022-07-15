import RadarChart from "../charts/RadarChart";

const songData = {
  id: "7ABfyynRwOeKPNGRs3VXtR",
  title: "陽キャJKに憧れる陰キャJKの歌",
  preview_url:
    "https://p.scdn.co/mp3-preview/3f9c2088a5c9854c4d1d53662eb9fe554cb3bf42?cid=774b29d4f13844c495f206cafdad9c86",
  music_feature: {
    danceability: 0.614,
    energy: 0.843,
    key: 0,
    loudness: -6.549,
    mode: 1,
    speechiness: 0.0393,
    acousticness: 0.257,
    instrumentalness: 0,
    liveness: 0.145,
    valence: 0.362,
    tempo: 158.016,
    duration_ms: 179241,
    time_signature: 4,
  },
  lyrics_feature: {
    lyrics_list: [
      {
        text: [
          "キャラメル",
          "マシュマロ",
          "いちご飴",
          "これ全部可愛い女の子の夢",
          "でも私が好きなのゲーム",
          "Apex",
          "いつになったら女の子になれるの？",
        ],
        rhyme_score: 66,
        positive_score: 30,
      },
      {
        text: [
          "パンケーキ",
          "わたあめ",
          "カフェオレ",
          "これストーリー載せてる子はオシャレ",
          "でも私の一人称は",
          "俺",
          "俺だって女の子に憧れてんだ",
        ],
        rhyme_score: 43,
        positive_score: 60,
      },
      {
        text: [
          "休日はネカフェ",
          "好きな漫画広げ",
          "現実から逃げ",
          "2次元に浸れ",
          "そうしてるうちに性格もひねくれ",
          "人も離れて趣味を独り占め",
        ],
        rhyme_score: 70,
        positive_score: 50,
      },
      {
        text: [
          "横にいる",
          "JK",
          "のスカート短ぇ",
          "一方",
          "俺の方は小4からかけてる",
          "メガネ",
          "今",
          "絶対",
          "陰キャだなって思ったろ",
          "お前？",
          "そうです私は何しても",
          "一生陰キャで",
        ],
        rhyme_score: 40,
        positive_score: 70,
      },
    ],
    total_rhyme_score: "54.75",
    total_emotion_score: "52.5",
    word_cloud_data: {},
  },
  artist: "音莉飴",
  genres: ["japanese teen pop", "jirai kei"],
  artist_uri: "48cmBTHGDXpbMmImSbBprJ",
  first_take: false,
  count: 14,
};

export default function SongDetail({ songId }) {
  // TODO：IDでデータベースからデータを引っ張ってくる
  return (
    <div style={{ padding: "1rem" }}>
      <div>
        {songData.title}
        {songData.artist}
        <audio controls src={songData.preview_url}></audio>
      </div>
      <div style={{ display: "flex", padding: "1rem 0" }}>
        <RadarChart feature={songData.music_feature} />
        <div>wordCloud?</div>
      </div>
      <div>other</div>
    </div>
  );
}
