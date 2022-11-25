import { useEffect, useState } from "react";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import SongList from "./SongList";
import { getScoreIcon } from "./SongListCard";
import { BuzzIconLegend } from "../common";
import { useRouter } from "next/router";
import { routeKey } from "../common";

export default function BuzzPossibility({ songData, showHeader, searchId }) {
  const [similarSongList, setSimilarSongList] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/similar_songs", {
        method: "POST",
        body: JSON.stringify(searchId),
      });
      const data = await songReq.json();
      setSimilarSongList(data);
    })();
  }, [searchId]);

  return (
    <div>
      {showHeader && (
        <div>
          <div
            className={style.buzz_title}
            onClick={() => {
              const searchId = router.query.search_id;
              router.push(`/search/${searchId}/${searchId}`);
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
              <SongList songList={similarSongList} route={routeKey.SEARCH} />
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
