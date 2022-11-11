import {
  InputBase,
  Paper,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./SearchSongs.module.css";

export default function SearchSongs(props) {
  const [inputSongName, setInputSongName] = useState("");
  const [songList, setSongList] = useState([]);
  const inputEl = useRef("");
  const router = useRouter();

  function changeInputSongName(event) {
    setInputSongName(inputEl.current.value);
    event.preventDefault();
  }

  function changeSelectId(id) {
    router.push(`/song/${id}`);
    if (props.clickAndClose) {
      props.handleClose();
    }
  }

  useEffect(() => {
    (async () => {
      if (inputSongName !== "") {
        const songListRes = await fetch("/api/spotify/search_songs", {
          method: "POST",
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
        <form onSubmit={changeInputSongName}>
          <div className={style.searchbar}>
            <InputBase
              style={{ padding: "4px 8px 4px 15px" }}
              placeholder="曲名 または アーティスト名を入力"
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
              style={{ padding: "4px 8px 4px 8px" }}
              type="text"
              size="small"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </div>
        </form>
      </Paper>
      {songList.map((song) => {
        return (
          // TODO:SongListCartと共通化
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
                        changeSelectId(song.id);
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
