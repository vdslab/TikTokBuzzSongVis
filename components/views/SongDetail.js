import RadarChart from "../charts/RadarChart";
import LyricsScoreChart from "../charts/LyricsScoreChart";
import WordCloud from "../charts/WordCloud";
import { useEffect, useState } from "react";

export default function SongDetail({ songId }) {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    (async () => {
      if (songId) {
        const songRes = await fetch("/api/db_song", {
          method: "POST",
          body: JSON.stringify(songId),
        });
        const data = await songRes.json();
        data.music_feature = JSON.parse(data.music_feature);
        data.lyrics_feature = JSON.parse(data.lyrics_feature);
        data.genres = JSON.parse(data.genres);
        setSongData(data);
      }
    })();
  }, [songId]);

  return (
    <div style={{ padding: "1rem" }}>
      <div>
        {songData.title}
        {songData.artist}
        <audio controls src={songData.preview_url}></audio>
      </div>
      <div style={{ display: "flex", padding: "1rem 0" }}>
        <div style={{ padding: "1rem", width: "50%" }}>
          <RadarChart feature={songData.music_feature} />
        </div>
        <div style={{ padding: "1rem" }}>
          <WordCloud feature={songData.lyrics_feature?.word_cloud_data} />
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        <LyricsScoreChart feature={songData.lyrics_feature} />
      </div>
    </div>
  );
}
