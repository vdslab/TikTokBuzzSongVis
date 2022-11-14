import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { ParallelCoordinates } from "../charts/ParallelCoordinates";
import { SongListCard } from "./SongListCard";
import { localStorageKey } from "../common";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { bookmarkState, selectedSong } from "../atoms";
import { clickLikeList, inList } from "../hooks/bookMarkHook";

export default function BuzzSongs() {
  const [likeList, setLikeList] = useRecoilState(bookmarkState);
  const [date, setDate] = useState([]);
  const [buzzSongList, setBuzzSongList] = useState([]);
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

  //TODO:ここも共通化したい
  useEffect(() => {
    const list = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, [setLikeList]);

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
      {buzzSongList.length > 0 && (
        <div className={style.title}>ピックアップ</div>
      )}
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
      <div className={style.upper}>
        {buzzSongList.map((data, idx) => {
          return (
            <SongListCard
              songInfo={data}
              key={idx}
              clickLikeList={() => {
                const adjustedList = clickLikeList(likeList, data.id);
                setLikeList(adjustedList);
              }}
              like={inList(likeList, data.id)}
            />
          );
        })}
      </div>

      {buzzSongList.length > 0 && (
        <div className={style.parallel}>
          <ParallelCoordinates
            songList={buzzSongList}
            priorityFeature={priorityFeature}
          />
        </div>
      )}
    </Box>
  );
}
