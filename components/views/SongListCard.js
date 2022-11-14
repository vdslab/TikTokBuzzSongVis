import { ListItem, List, Grid, Typography } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { MINI_DISPLAY_SIZE } from "../common";
import { useWindowSize } from "../hooks/getWindwSize";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectedSong } from "../atoms";
import { useRecoilState } from "recoil";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

export function getScoreIcon(score) {
  if (score === 100) {
    return <RadioButtonCheckedIcon />;
  } else if (score === 66) {
    return <RadioButtonUncheckedIcon />;
  }
  return <ChangeHistoryIcon />;
}

export function SongListCard({ songInfo, clickLikeList, like, showScore }) {
  const { height, width } = useWindowSize();
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  const router = useRouter();
  //TODO:返ってくるデータの形を同じにしておきたい
  const title = songInfo.detail ? songInfo.detail.title : songInfo.title;
  const img_url = songInfo.detail ? songInfo.detail.img_url : songInfo.img_url;
  const artist = songInfo.detail ? songInfo.detail.artist : songInfo.artist;
  const preview_url = songInfo.detail
    ? songInfo.detail.preview_url
    : songInfo.preview_url;

  function showSelectIdSong(id) {
    router.push(`/song/detail/${id}`);
  }

  return (
    <List>
      <ListItem>
        <div className={style.listitem}>
          {/* TODO:Imageタグに置き換える */}
          <Grid container>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2}>
                <img
                  src={img_url}
                  style={{
                    margin: "auto",
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  alt=""
                />
              </Grid>
              <Grid item xs={7} md={8} container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid
                    item
                    xs
                    onClick={() => {
                      if (width > MINI_DISPLAY_SIZE) {
                        setSelectedSongId(songInfo.id);
                      } else {
                        showSelectIdSong(songInfo.id);
                      }
                    }}
                    className={style.names}
                  >
                    <Typography variant="subtitle1" component="div">
                      {title}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {artist}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} md={2}>
                <IconButton
                  style={{
                    color: like ? "rgb(250, 58, 96)" : "white",
                    stroke: like ? "none" : "#aaa",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    clickLikeList(songInfo.id);
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                {showScore && (
                  <div style={{ paddingLeft: "8px" }}>
                    {getScoreIcon(songInfo.rank)}
                  </div>
                )}
              </Grid>
            </Grid>

            {/* TODO:ボタンにする
              <IconButton
                size="medium"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  setIsOpenPopup(true);
                }}
              >
                <SearchIcon />
              </IconButton> */}

            {/* <audio
            controls
            id="demo"
            src={songInfo.detail.preview_url}
          ></audio> */}
            {/* <div class="container">
            <div>
              <button id="play" class="btn btn-primary">
                再生
              </button>
            </div>
          </div> */}

            <audio
              controls
              src={preview_url}
              style={{ paddingTop: "12px", margin: "0 auto" }}
            ></audio>
          </Grid>
        </div>
      </ListItem>
    </List>
  );
}

SongListCard.defaultProps = {
  showScore: true,
};
