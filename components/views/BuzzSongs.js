import { useEffect, useState } from "react";
import { Box, List, ListItem } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { ParallelCoordinates } from "../charts/ParallelCoordinates";
// import Image from "next/image";

export default function BuzzSongs({ setSelectedSongId }) {
  const [date, setDate] = useState([]);
  const [buzzSongList, setBuzzSongList] = useState([]);
  const [priorityFeature, setPriorityFeature] = useState([]);

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
        const buzzSongsReq = await fetch("api/buzz_songs", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(date[0]),
        });
        // TODO:rank->title順での並び替え（現状ではrankでのみ）
        const data = await buzzSongsReq.json();
        // JSONをobjに
        for (const song of data) {
          song.detail.music_feature = JSON.parse(song.detail.music_feature);
          song.detail.lyrics_feature = JSON.parse(song.detail.lyrics_feature);
          song.detail.genres = JSON.parse(song.detail.genres);
        }
        setBuzzSongList(data);
        setSelectedSongId(data[0].id);

        const featureReq = await fetch("api/priority_feature", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(date[0]),
        });
        const featureData = await featureReq.json();
        setPriorityFeature(JSON.parse(featureData.feature));
      }
    })();
  }, [date]);

  return (
    <Box component="main">
      <div className={style.title}>これから流行る曲はこれだ！</div>
      <div className={style.upper}>
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
                          className={style.name_score}
                          onClick={() => {
                            setSelectedSongId(data.id);
                            console.log("click");
                          }}
                        >
                          <div>{data.detail.title}</div>
                          <div>{data.rank}点</div>
                        </div>
                        <div
                          onClick={() => {
                            setSelectedSongId(data.id);
                            console.log("click");
                          }}
                        >
                          {data.detail.artist}
                        </div>
                      </div>
                    </div>
                    {/* <audio
                      controls
                      id="demo"
                      src={data.detail.preview_url}
                    ></audio> */}
                    {/* <div class="container">
                      <div>
                        <button id="play" class="btn btn-primary">
                          再生
                        </button>
                      </div>
                    </div> */}

                    <audio controls src={data.detail.preview_url}></audio>
                  </div>
                </ListItem>
              </List>
            </div>
          );
        })}
      </div>
      {buzzSongList.length > 0 && (
        <div className={style.parallel}>
          <ParallelCoordinates
            songList={buzzSongList}
            priorityFeature={priorityFeature}
          />
        </div>
      )}
    </Box>
  );
}
