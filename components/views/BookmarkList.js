import { useState, useEffect } from "react";
import { SongListCard } from "./SongListCard";
import { sampleList } from "./data";
import { localStorageKey } from "../common";

// TODO:sampleListではなくローカルから取得したIDをもとに情報を取得して表示する

export default function BookmarkList() {
  const [likeList, setLikeList] = useState([]);
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
    localStorage.setItem("BUZZLEAD_LIKE_LIST", JSON.stringify(adjustedList));
    setLikeList(adjustedList);
  }

  function inLikeList(id) {
    return likeList.includes(id);
  }
  return (
    <div>
      お気に入り
      {sampleList.map((song) => {
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
