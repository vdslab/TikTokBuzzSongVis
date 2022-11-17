import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilState } from "recoil";
import { selectedSong } from "../atoms";
import SongList from "./SongList";
import { getScoreIcon } from "./SongListCard";
import { BuzzIconLegend } from "../common";

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
        <div style={{ paddingBottom: "8px", fontWeight: "bold" }}>
          類似した流行度の高い曲
        </div>
        <div className={style.upper}>
          {similarSongList ? (
            <div>
              {similarSongList.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.9rem",
                  }}
                >
                  流行度
                  <BuzzIconLegend />
                </div>
              )}
              <SongList songList={similarSongList} />
            </div>
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
