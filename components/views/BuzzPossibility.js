import { useEffect, useState } from "react";
import { List, ListItem } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import CircularProgress from "@mui/material/CircularProgress";

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
          className={style.images_names}
          onClick={() => {
            setSelectedSongId(songData.id);
            console.log("click");
          }}
        >
          {songData.title} バズり度 {songData.rank}
        </div>
        <audio controls src={songData.preview_url}></audio>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <div>{songData.title}の類似曲</div>
        {similarSongList.length > 0 ? (
          similarSongList.map((song) => {
            return (
              <List key={song.id} className={style.songlist}>
                <ListItem>
                  <div className={style.listitem}>
                    {/* TODO:Imageタグに置き換える */}
                    <div className={style.images_names}>
                      <img
                        src={song.img_url}
                        style={{ width: "50px", height: "50px" }}
                        alt=""
                        className={style.image}
                      ></img>
                      <div className={style.names}>
                        {/* HACK:Linkの方がいい？ */}
                        <div
                          className={style.name_score}
                          onClick={() => {
                            setSelectedSongId(song.id);
                            console.log("click");
                          }}
                        >
                          <div>{song.title}</div>
                          <div>{song.rank}点</div>
                        </div>
                        <div>{song.artist}</div>
                      </div>
                    </div>
                    <audio controls src={song.preview_url}></audio>
                  </div>
                </ListItem>
              </List>
            );
          })
        ) : (
          <div style={{ textAlign: "center", paddingTop: "100px" }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}
