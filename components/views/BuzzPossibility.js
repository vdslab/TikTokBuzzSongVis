import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilState } from "recoil";
import { selectedSong } from "../atoms";
import SongList from "./SongList";
import { getScoreIcon } from "./SongListCard";

export default function BuzzPossibility({ songData }) {
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
      <div>
        <div
          className={style.buzz_title}
          onClick={() => {
            setSelectedSongId(songData.id);
            console.log("clicked");
          }}
        >
          {songData.title} バズり度&ensp;
          <div style={{ display: "flex", alineItems: "center" }}>
            {getScoreIcon(songData.rank)}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <div style={{ paddingBottom: "16px" }}>{songData.title}の類似曲</div>
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
