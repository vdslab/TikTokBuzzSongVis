import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { SongListCard } from "./SongListCard";

export default function BuzzPossibility({ songData, setSelectedSongId }) {
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
