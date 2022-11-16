import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilState } from "recoil";
import { selectedSong } from "../atoms";
import SongList from "./SongList";
import { getScoreIcon } from "./SongListCard";

export default function BuzzPossibility({ songData, showHeader }) {
  const [similarSongList, setSimilarSongList] = useState(null);
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);

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
      {showHeader && (
        <div>
          <div
            className={style.buzz_title}
            onClick={() => {
              setSelectedSongId(songData.id);
            }}
          >
            {songData.title} 流行度&ensp;
            <div style={{ display: "flex", alineItems: "center" }}>
              {getScoreIcon(songData.rank)}
            </div>
          </div>
        </div>
      )}
      <div style={{ paddingTop: "16px" }}>
        <div style={{ paddingBottom: "8px" }}>類似曲で流行度が高いもの</div>
        <div className={style.upper}>
          {similarSongList ? (
            <SongList songList={similarSongList} />
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
