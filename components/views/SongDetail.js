import RadarChart from "../charts/RadarChart";
import LyricsScoreChart from "../charts/LyricsScoreChart";
import WordCloudChart from "../charts/WordCloud";
import { useEffect, useState } from "react";
import style from "./SongDetail.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { localStorageKey } from "../common";

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
  const [songData, setSongData] = useState();
  const [likeList, setLikeList] = useState([]);

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

  useEffect(() => {
    const list = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, []);

  // TODO:共通化
  function clickLikeList(selectedId) {
    let adjustedList;
    if (inLikeList(selectedId)) {
      // リストにあればお気に入り削除
      adjustedList = likeList.filter((id) => id !== selectedId);
    } else {
      // リストになければお気に入り登録
      adjustedList = likeList.concat([selectedId]);
    }
    localStorage.setItem(
      localStorageKey.BUZZLEAD_LIKE_LIST,
      JSON.stringify(adjustedList)
    );
    setLikeList(adjustedList);
  }

  function inLikeList(id) {
    return likeList.includes(id);
  }

  if (!songData) {
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div className={style.listitem}>
        {songData && (
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
            <div
              style={{
                color: inLikeList(songData.id) ? "red" : "black",
                cursor: "pointer",
              }}
              onClick={() => {
                clickLikeList(songData.id);
              }}
            >
              like
            </div>
          </div>
        )}
        <audio controls src={songData.preview_url}></audio>
      </div>
      {/**TODO:ぬまけいお願いします：pc iphoneによって、縦横並びの調整 */}
      <div className={style.charts}>
        <div className={style.raderchart}>
          {songData.music_feature && (
            <RadarChart feature={songData.music_feature} />
          )}
        </div>
        <div className={style.wordcloud}>
          {songData.lyrics_feature?.word_cloud_data &&
          Object.keys(songData.lyrics_feature?.word_cloud_data).length > 0 ? (
            <WordCloudChart
              feature={songData.lyrics_feature?.word_cloud_data}
            />
          ) : (
            <div style={{ width: 380 }}>
              <div style={{ fontSize: "20px", paddingBottom: "8px" }}>
                歌詞を特徴づけるワード
              </div>
              <div
                style={{
                  height: "300px",
                  border: "solid 0.1px",
                  borderColor: "#bbbbbb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div> 表示するデータがありません</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        {songData.lyrics_feature ? (
          <LyricsScoreChart feature={songData.lyrics_feature} />
        ) : (
          <div style={{ width: 900 }}>
            <div style={{ fontSize: "20px", paddingBottom: "8px" }}>
              ポジティブ度&韻踏み度
            </div>
            <div
              style={{
                height: "300px",
                border: "solid 0.1px",
                borderColor: "#bbbbbb",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>表示するデータがありません</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
