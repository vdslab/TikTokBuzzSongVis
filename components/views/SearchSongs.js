import {
  InputBase,
  Paper,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";
import style from "./BuzzSongs.module.css";
import { useRouter } from "next/router";

export default function SearchSongs({ feature }) {
  const [inputSongName, setInputSongName] = useState("");
  const [songList, setSongList] = useState([]);
  const inputEl = useRef("");
  const router = useRouter();

  function changeInputSongName() {
    setInputSongName(inputEl.current.value);
  }

  useEffect(() => {
    (async () => {
      if (inputSongName !== "") {
        const songListRes = await fetch("/api/spotify/search_songs", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(inputSongName),
        });
        const songListData = await songListRes.json();
        setSongList(songListData);
      }
    })();
  }, [inputSongName]);

  return (
    <div>
      <Paper
        variant="outlined"
        sx={{
          p: "4px 4px",
          display: "flex",
          alignItems: "center",
          overflowY: "clip",
        }}
      >
        <InputBase
          placeholder="曲名を検索"
          inputProps={{ "aria-label": "SchoolName" }}
          inputRef={inputEl}
          fullWidth={true}
          onChange={(e) => {
            if (e.target.value === "") {
              setInputSongName("");
            }
          }}
          sx={{ m: 1 }}
        />
        <IconButton
          type="text"
          size="small"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={changeInputSongName}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {songList.map((song) => {
        return (
          <List key={song.id} className={style.songlist}>
            <ListItem>
              <div className={style.listitem}>
                {/* TODO:Imageタグに置き換える */}
                <div className={style.images_names}>
                  <img
                    src={song.album.images[0].url}
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                    className={style.image}
                  ></img>
                  <div className={style.names}>
                    {/* HACK:Linkの方がいい？ */}
                    <div
                      onClick={() => {
                        router.push(`/song/${song.id}`);
                      }}
                    >
                      {song.name}
                    </div>
                    <div>{song.artists[0].name}</div>
                  </div>
                </div>
                <audio controls src={song.preview_url}></audio>
              </div>
            </ListItem>
          </List>
        );
      })}
    </div>
  );
}
