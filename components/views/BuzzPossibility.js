import { useEffect, useState } from "react";
import { List, ListItem } from "@material-ui/core";
import style from "./BuzzSongs.module.css";

export default function BuzzPossibility({ songData }) {
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
        {songData.title} バズり度 {songData.rank}
        <audio controls src={songData.preview_url}></audio>
      </div>
      <div>
        <div>{songData.title}の類似曲</div>
        {similarSongList.map((song) => {
          return (
            <List key={song.id} className={style.songlist}>
              <ListItem>
                <div className={style.listitem}>
                  {/* TODO:Imageタグに置き換える */}
                  <div className={style.images_names}>
                    <img
                      src={song.images_url}
                      style={{ width: "50px", height: "50px" }}
                      alt=""
                      className={style.image}
                    ></img>
                    <div className={style.names}>
                      {/* HACK:Linkの方がいい？ */}
                      <div
                        onClick={() => {
                          // router.push(`/song/${song.id}`);
                          // if (props.clickAndClose) {
                          //   props.handleClose();
                          // }
                        }}
                      >
                        {song.title}
                      </div>
                      <div>{song.artists}</div>
                    </div>
                  </div>
                  <audio controls src={song.preview_url}></audio>
                </div>
              </ListItem>
            </List>
          );
        })}
      </div>
    </div>
  );
}
