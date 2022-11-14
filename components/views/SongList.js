import { SongListCard } from "./SongListCard";
import { useRecoilState } from "recoil";
import { bookmarkState } from "../atoms";
import { localStorageKey } from "../common";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../common";
import style from "./SongList.module.css";

export function clickLikeList(likeList, selectedId) {
  let adjustedList;
  if (inList(likeList, selectedId)) {
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
  return adjustedList;
}

export function inList(list, id) {
  return list?.includes(id);
}

function getShowList(list, isShort) {
  if (isShort) {
    if (list.length <= 3) {
      return list;
    }
    return list.slice(0, 3);
  }
  return list;
}

export default function SongList({ songList, showScore }) {
  const { width } = useWindowSize();
  const [likeList, setLikeList] = useRecoilState(bookmarkState);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const list = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, [setLikeList]);

  return (
    <div className={style.song_list}>
      {getShowList(songList, showMore).map((song) => {
        return (
          <SongListCard
            songInfo={song}
            key={song.id}
            clickLikeList={() => {
              const adjustedList = clickLikeList(likeList, song.id);
              setLikeList(adjustedList);
            }}
            like={inList(likeList, song.id)}
            showScore={showScore}
          />
        );
      })}
      {width <= MINI_DISPLAY_SIZE && (
        <div className={style.show_list} onClick={() => setShowMore(!showMore)}>
          {showMore ? "一部を表示 ▲" : "もっと見る ▼"}{" "}
        </div>
      )}
    </div>
  );
}

SongList.defaultProps = {
  showScore: true,
};
