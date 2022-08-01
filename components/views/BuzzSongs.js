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
              <List
                className={style.songlist}
                // className="songlist"
                // style={{
                //   display: "flex",
                //   alignItems: "flexStart",
                //   position: "relative",
                //   flexDirection: "column",
                //   boxSizing: "borderBox",
                //   textAlign: "left",
                //   justifyContents: "flexStart",
                // }}
              >
                <ListItem>
                  {/* TODO:Imageタグに置き換える */}
                  <img
                    src={data.detail.img_url}
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                  ></img>
                  {/* <Image src={data.detail.img_url} width={50} height={50} /> */}
                  <div
                    onClick={() => {
                      setSelectedSongId(data.id);
                      console.log("click");
                    }}
                  >
                    {data.detail.title}
                  </div>
                  <div>{data.detail.artist}</div>
                  <audio controls src={data.detail.preview_url}></audio>
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
