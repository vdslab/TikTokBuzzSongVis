import RadarChart from "../charts/RadarChart";
import LyricsScoreChart from "../charts/LyricsScoreChart";
import WordCloudChart from "../charts/WordCloud";
import { useEffect, useState } from "react";
import style from "./SongDetail.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { localStorageKey } from "../common";
import { useRecoilState } from "recoil";
import { bookmarkState, selectedSong } from "../atoms";
import { clickLikeList, inList } from "../hooks/bookMarkHook";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@material-ui/core";
import BuzzDate from "./BuzzDate";

async function getDbSongData(songId) {
  const songRes = await fetch("/api/db_song", {
    method: "POST",
    body: JSON.stringify(songId),
  });
  const data = await songRes.json();
  if (typeof data.music_feature === "string") {
    data.music_feature = JSON.parse(data.music_feature);
    data.lyrics_feature = JSON.parse(data.lyrics_feature);
    data.genres = JSON.parse(data.genres);
  }
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
export default function SongDetail({ hasData }) {
  const [songData, setSongData] = useState(null);
  const [likeList, setLikeList] = useRecoilState(bookmarkState);
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);

  useEffect(() => {
    (async () => {
      if (selectedSongId) {
        if (hasData) {
          const data = await getDbSongData(selectedSongId);
          setSongData(data);
        } else {
          const data = await getSongData(selectedSongId);
          setSongData(data);
        }
      }
    })();
  }, [selectedSongId, hasData]);

  useEffect(() => {
    const list = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, []);

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
            <IconButton
              style={{
                color: inList(likeList, songData.id)
                  ? "rgb(250, 58, 96)"
                  : "white",
                stroke: inList(likeList, songData.id) ? "none" : "#aaa",
                cursor: "pointer",
              }}
              onClick={() => {
                const adjustedList = clickLikeList(likeList, songData.id);
                setLikeList(adjustedList);
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
        )}
        <audio controls src={songData.preview_url}></audio>
      </div>
      <BuzzDate />
      {/**TODO:ぬまけいお願いします：pc iphoneによって、縦横並びの調整 */}

      <Grid container>
        <Grid item xs={7}>
          <div className={style.raderchart}>
            {songData.music_feature && (
              <RadarChart feature={songData.music_feature} />
            )}
          </div>
        </Grid>
        <Grid item xs={5}>
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
        </Grid>
      </Grid>

      <div style={{ paddingTop: "1rem" }}>
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

SongDetail.defaultProps = {
  hasData: false,
};
