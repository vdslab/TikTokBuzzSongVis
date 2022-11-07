import { useState, useEffect } from "react";
import { SongListCard } from "./SongListCard";
import { localStorageKey } from "../common";

async function getSongBasicInfo(songId) {
  const songInfoReq = await fetch("/api/song_basic_info", {
    method: "POST",
    body: JSON.stringify(songId),
  });
  const songInfo = await songInfoReq.json();
  return songInfo;
}

export default function BookmarkList() {
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    (async () => {
      const songlist = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
      const parsedSongIdList = JSON.parse(songlist);

      const songInfoList = [];
      for (const id of parsedSongIdList) {
        const song = await getSongBasicInfo(id);
        songInfoList.push(song);
      }

      setLikeList(songInfoList);
    })();
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
    return likeList?.includes(id);
  }

  return (
    <div>
      お気に入り
      {likeList.map((song) => {
        console.log(song);
        return (
          <SongListCard
            songInfo={song}
            key={song.id}
            like={inLikeList(song.id)}
            clickLikeList={clickLikeList}
          />
        );
      })}
    </div>
  );
}
