import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";

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
        setBuzzSongList(data);
      }
    })();
  }, [date]);

  return (
    <Box component="main">
      <div>buzzSongsView</div>
      {buzzSongList.map((data, idx) => {
        return (
          <div key={idx}>
            <List
              className="songlist"
              style={{
                display: "flex",
                alignItems: "flexStart",
                position: "relative",
                flexDirection: "column",
                boxSizing: "borderBox",
                textAlign: "left",
                justifyContents: "flexStart",
              }}
            >
              <ListItem>
                <div
                  onClick={() => {
                    setSelectedSongId(data.id);
                    console.log("click");
                  }}
                >
                  {data.title}
                </div>
                <div>{data.artist}</div>
                <audio controls src={data.preview_url}></audio>
              </ListItem>
            </List>
          </div>
        );
      })}
    </Box>
  );
}
