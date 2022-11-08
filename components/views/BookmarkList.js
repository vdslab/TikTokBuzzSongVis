import { useEffect, useState } from "react";
import { SongListCard } from "./SongListCard";
import { localStorageKey } from "../common";
import { useRecoilState } from "recoil";
import { bookmarkState } from "../atoms";
import { clickLikeList, inList } from "../hooks/bookMarkHook";
import style from "./SongDetail.module.css";
import CircularProgress from "@mui/material/CircularProgress";

async function getSongBasicInfo(songId) {
  const songInfoReq = await fetch("/api/song_basic_info", {
    method: "POST",
    body: JSON.stringify(songId),
  });
  const songInfo = await songInfoReq.json();
  return songInfo;
}

export default function BookmarkList() {
  const [likeIdList, setLikeIdList] = useRecoilState(bookmarkState);
  const [likeSongInfoList, setLikeSongInfoList] = useState(null);

  useEffect(() => {
    (async () => {
      const songlist = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
      const parsedSongIdList = JSON.parse(songlist);
      setLikeIdList(parsedSongIdList);

      const songInfoList = [];
      if (parsedSongIdList) {
        for (const id of parsedSongIdList) {
          const song = await getSongBasicInfo(id);
          songInfoList.push(song);
        }
      }
      setLikeSongInfoList(songInfoList);
    })();
  }, [setLikeSongInfoList, setLikeIdList]);

  if (likeSongInfoList === null) {
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      お気に入り
      {likeSongInfoList.map((song) => {
        return (
          <SongListCard
            songInfo={song}
            key={song.id}
            like={inList(likeIdList, song.id)}
            clickLikeList={() => {
              const adjustedIdList = clickLikeList(likeIdList, song.id);
              setLikeIdList(adjustedIdList);
              const adjustedSongList = likeSongInfoList.filter(
                (like) => like.id !== song.id
              );
              setLikeSongInfoList(adjustedSongList);
            }}
          />
        );
      })}
    </div>
  );
}
