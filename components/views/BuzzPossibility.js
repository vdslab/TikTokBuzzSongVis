import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { SongListCard } from "./SongListCard";

export default function BuzzPossibility({ songData, setSelectedSongId }) {
  const [likeList, setLikeList] = useState([]);
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
      <div>
        <div
          className={style.buzz_title}
          onClick={() => {
            setSelectedSongId(songData.id);
            console.log("click");
          }}
        >
          {songData.title} バズり度 <span>{songData.rank}点</span>
        </div>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <div>{songData.title}の類似曲</div>
        <div className={style.upper}>
          {similarSongList.length > 0 ? (
            similarSongList.map((song, idx) => {
              return (
                <SongListCard
                  songInfo={song}
                  setSelectedSongId={setSelectedSongId}
                  key={idx}
                  clickLikeList={clickLikeList}
                  like={inLikeList(song.id)}
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
