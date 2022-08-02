import RadarChart from "../charts/RadarChart";
import LyricsScoreChart from "../charts/LyricsScoreChart";
import WordCloudChart from "../charts/WordCloud";
import { useEffect, useState } from "react";
import style from "./SongDetail.module.css";

async function getDbSongData(songId) {
  const songRes = await fetch("/api/db_song", {
    method: "POST",
    body: JSON.stringify(songId),
  });
  const data = await songRes.json();
  data.music_feature = JSON.parse(data.music_feature);
  data.lyrics_feature = JSON.parse(data.lyrics_feature);
  data.genres = JSON.parse(data.genres);
  return data;
}

async function getSongData(songId) {
  const songInfoReq = await fetch("/api/bebebe/song_info", {
    method: "POST",
    body: JSON.stringify(songId),
  });
  const songInfo = await songInfoReq.json();
  return songInfo;
}

// HACK:親コンポーネントからdetail情報を渡した方がいい
export default function SongDetail({ songId, hasData }) {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    (async () => {
      if (songId) {
        if (hasData) {
          const data = await getDbSongData(songId);
          setSongData(data);
        } else {
          const data = await getSongData(songId);
          setSongData(data);
        }
      }
    })();
  }, [songId, hasData]);

  return (
    <div style={{ padding: "1rem" }}>
      <div className={style.listitem}>
        <div className={style.images_names}>
          <img
            src={songData.img_url}
            style={{ width: "50px", height: "50px" }}
            alt=""
            className={style.image}
          ></img>
          <div className={style.names}>
            <div>{songData.title}</div>
            <div>&nbsp; / &nbsp;</div>
            <div>{songData.artist}</div>
          </div>
        </div>
        <audio controls src={songData.preview_url}></audio>
      </div>

      <div className={style.charts}>
        <div className={style.raderchart}>
          {songData.music_feature && (
            <RadarChart feature={songData.music_feature} />
          )}
        </div>
        <div className={style.wordcloud}>
          {songData.lyrics_feature?.word_cloud_data &&
            Object.keys(songData.lyrics_feature?.word_cloud_data).length >
              0 && (
              <WordCloudChart
                feature={songData.lyrics_feature?.word_cloud_data}
              />
            )}
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        {songData.lyrics_feature && (
          <LyricsScoreChart feature={songData.lyrics_feature} />
        )}
      </div>
    </div>
  );
}
