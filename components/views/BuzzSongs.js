import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import style from "./BuzzSongs.module.css";
import { ParallelCoordinates } from "../charts/ParallelCoordinates";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useRecoilState } from "recoil";
import { selectedSong } from "../atoms";
import SongList from "./SongList";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

export default function BuzzSongs() {
  const [date, setDate] = useState([]);
  const [buzzSongList, setBuzzSongList] = useState(null);
  const [priorityFeature, setPriorityFeature] = useState([]);
  const [selectedDateIdx, setselectedDateIdx] = useState(0);
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);

  useEffect(() => {
    (async () => {
      const dateRes = await fetch("/api/date");
      const data = await dateRes.json();
      setDate(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (date.length > 0) {
        const buzzSongsReq = await fetch("api/buzz_songs", {
          method: "POST",
          body: JSON.stringify(date[selectedDateIdx]),
        });
        // TODO:rank->title順での並び替え（現状ではrankでのみ）
        const data = await buzzSongsReq.json();
        // JSONをobjに
        for (const song of data) {
          // TODO:データベースのデータ形式を揃える
          if (typeof song.detail.music_feature === "string") {
            song.detail.music_feature = JSON.parse(song.detail.music_feature);
            song.detail.lyrics_feature = JSON.parse(song.detail.lyrics_feature);
            song.detail.genres = JSON.parse(song.detail.genres);
          }
        }
        setBuzzSongList(data);
        setSelectedSongId(data[0].id);

        const featureReq = await fetch("api/priority_feature", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(date[date.length - 1]),
        });
        const featureData = await featureReq.json();
        setPriorityFeature(JSON.parse(featureData.feature));
      }
    })();
  }, [selectedDateIdx, date, setSelectedSongId]);

  return (
    <Box component="main">
      <div className={style.title}>ピックアップ</div>
      {buzzSongList ? (
        <div>
          <div className={style.date_select}>
            <IconButton
              size="medium"
              color="inherit"
              onClick={() => {
                setselectedDateIdx(selectedDateIdx + 1);
              }}
              disabled={selectedDateIdx === date.length - 1}
            >
              <ArrowLeftIcon />
            </IconButton>
            {date[selectedDateIdx]}
            <IconButton
              size="medium"
              color="inherit"
              onClick={() => {
                setselectedDateIdx(selectedDateIdx - 1);
              }}
              disabled={selectedDateIdx === 0}
            >
              <ArrowRightIcon />
            </IconButton>
          </div>

          <SongList songList={buzzSongList} />

          <div className={style.parallel}>
            <ParallelCoordinates
              songList={buzzSongList}
              priorityFeature={priorityFeature}
            />
          </div>
        </div>
      ) : (
        <div className={style.loading}>
          <CircularProgress />
        </div>
      )}
    </Box>
  );
}
