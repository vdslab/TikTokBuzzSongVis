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
    rhyme: 1.5,
    emotion: 0.5,
    rhyme_list: [],
    emotion_list: [],
    lyrics_text: [],
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
