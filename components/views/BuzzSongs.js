import { useEffect, useState } from "react";
import { Box, List, ListItem } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { ParallelCoordinates } from "../charts/ParallelCoordinates";
// import Image from "next/image";

export default function BuzzSongs({ setSelectedSongId }) {
  const [date, setDate] = useState([]);
  const [buzzSongList, setBuzzSongList] = useState([]);

  useEffect(() => {
    (async () => {
      const dateRes = await fetch("/api/date");
      const data = await dateRes.json();
      setDate(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (date.length > 0) {
        const buzzSongsRes = await fetch("api/buzz_songs", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(date[0]),
        });
        // TODO:rank->title順での並び替え（現状ではrankでのみ）
        const data = await buzzSongsRes.json();
        // JSONをobjに
        for (const song of data) {
          song.detail.music_feature = JSON.parse(song.detail.music_feature);
          song.detail.lyrics_feature = JSON.parse(song.detail.lyrics_feature);
          song.detail.genres = JSON.parse(song.detail.genres);
        }
        setBuzzSongList(data);
      }
    })();
  }, [date]);

  return (
    <Box component="main">
      <div>buzzSongsView</div>
      <div>
        {buzzSongList.map((data, idx) => {
          return (
            <div key={idx}>
              <List className={style.songlist}>
                <ListItem>
                  <div className={style.listitem}>
                    {/* TODO:Imageタグに置き換える */}
                    <div className={style.images_names}>
                      <img
                        src={data.detail.img_url}
                        style={{ width: "50px", height: "50px" }}
                        alt=""
                        className={style.image}
                      ></img>
                      {/* <Image src={data.detail.img_url} width={50} height={50} /> */}
                      <div className={style.names}>
                        <div
                          onClick={() => {
                            setSelectedSongId(data.id);
                            console.log("click");
                          }}
                        >
                          {data.detail.title}
                        </div>
                        <div>{data.detail.artist}</div>
                      </div>
                    </div>
                    <audio controls src={data.detail.preview_url}></audio>
                  </div>
                </ListItem>
              </List>
            </div>
          );
        })}
      </div>
      {buzzSongList.length > 0 && (
        <div>
          <ParallelCoordinates songList={buzzSongList} />
        </div>
      )}
    </Box>
  );
}
