import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { SongListCard } from "./SongListCard";
import { localStorageKey } from "../common";
import { useRecoilState } from "recoil";
import { bookmarkState } from "../atoms";
import { clickLikeList, inList } from "../hooks/bookMarkHook";

export default function BuzzPossibility({ songData, setSelectedSongId }) {
  const [likeList, setLikeList] = useRecoilState(bookmarkState);
  const [similarSongList, setSimilarSongList] = useState([]);
  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/similar_songs", {
        method: "POST",
        body: JSON.stringify(songData.id),
      });
      const data = await songReq.json();
      setSimilarSongList(data);
    })();
  }, [songData]);

  useEffect(() => {
    const list = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
    if (list) {
      const parsedList = JSON.parse(list);
      setLikeList(parsedList);
    }
  }, []);

  return (
    <div>
      <div>
        <div
          className={style.buzz_title}
          onClick={() => {
            setSelectedSongId(songData.id);
          }}
        >
          {songData.title} バズり度 <span>{songData.rank}点</span>
        </div>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <div style={{ paddingBottom: "16px" }}>{songData.title}の類似曲</div>
        <div className={style.upper}>
          {similarSongList.length > 0 ? (
            similarSongList.map((song, idx) => {
              return (
                <SongListCard
                  songInfo={song}
                  setSelectedSongId={setSelectedSongId}
                  key={idx}
                  clickLikeList={() => {
                    const adjustedList = clickLikeList(likeList, song.id);
                    setLikeList(adjustedList);
                  }}
                  like={inList(likeList, song.id)}
                />
              );
            })
          ) : (
            <div style={{ textAlign: "center", paddingTop: "100px" }}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
