import { SongListCard } from "./SongListCard";
import { useRecoilState } from "recoil";
import { bookmarkState } from "../atoms";
import { localStorageKey } from "../common";
import { useEffect } from "react";

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

export default function SongList({ songList, showScore, clickLike }) {
  const [likeList, setLikeList] = useRecoilState(bookmarkState);
  const [likeIdList, setLikeIdList] = useRecoilState(bookmarkState);

  useEffect(() => {
    const list = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, [setLikeList]);

  return (
    <div>
      {songList.map((song) => {
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
    </div>
  );
}

SongList.defaultProps = {
  showScore: true,
};
