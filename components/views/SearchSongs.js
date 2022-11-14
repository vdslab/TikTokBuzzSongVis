import {
  InputBase,
  Paper,
  IconButton,
  List,
  ListItem,
  Grid,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./SearchSongs.module.css";
import { Player } from "../Player";

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
      <Grid container>
        <Grid item xs={12} md={12}>
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
                  style={{ padding: "4px 8px 4px 15px", fontSize: "12px" }}
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
        </Grid>

        {songList.map((song) => {
          return (
            // TODO:SongListCartと共通化
            <Grid item xs={12} md={4} key={song.id}>
              <List key={song.id} className={style.songlist}>
                <ListItem>
                  <div className={style.listitem}>
                    <Grid container spacing={2}>
                      <Grid item xs={3} md={3}>
                        <Player
                          audioUrl={song.preview_url}
                          id={song.id}
                          imgUrl={song.album.images[0].url}
                          size={60}
                        />
                      </Grid>
                      <Grid item xs={9} md={9} container spacing={1}>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid
                            item
                            xs
                            onClick={() => {
                              changeSelectId(song.id);
                            }}
                            className={style.names}
                          >
                            <Typography variant="subtitle1" component="div">
                              {song.name}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                              {song.artists[0].name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </ListItem>
              </List>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
