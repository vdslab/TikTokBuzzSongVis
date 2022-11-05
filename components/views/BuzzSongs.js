import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { ParallelCoordinates } from "../charts/ParallelCoordinates";
import { SongListCard } from "./SongListCard";

export default function BuzzSongs({ setSelectedSongId }) {
  const [likeList, setLikeList] = useState([]);
  const [date, setDate] = useState([]);
  const [buzzSongList, setBuzzSongList] = useState([]);
  const [priorityFeature, setPriorityFeature] = useState([]);

  useEffect(() => {
    (async () => {
      const dateRes = await fetch("/api/date");
      const data = await dateRes.json();
      setDate(data);
    })();
  }, []);

  useEffect(() => {
    const list = localStorage.getItem("BUZZLEAD_LIKE_LIST");
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (date.length > 0) {
        const buzzSongsReq = await fetch("api/buzz_songs", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(date[date.length - 1]),
        });
        // TODO:rank->title順での並び替え（現状ではrankでのみ）
        const data = await buzzSongsReq.json();
        // JSONをobjに
        for (const song of data) {
          song.detail.music_feature = JSON.parse(song.detail.music_feature);
          song.detail.lyrics_feature = JSON.parse(song.detail.lyrics_feature);
          song.detail.genres = JSON.parse(song.detail.genres);
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
  }, [date]);

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
    localStorage.setItem("BUZZLEAD_LIKE_LIST", JSON.stringify(adjustedList));
    setLikeList(adjustedList);
  }

  function inLikeList(id) {
    return likeList.includes(id);
  }

  return (
    <Box component="main">
      {buzzSongList.length > 0 && (
        <div className={style.title}>ピックアップ</div>
      )}
      <div className={style.upper}>
        {buzzSongList.map((data, idx) => {
          return (
            <SongListCard
              songInfo={data}
              setSelectedSongId={setSelectedSongId}
              key={idx}
              clickLikeList={clickLikeList}
              like={inLikeList(data.id)}
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
