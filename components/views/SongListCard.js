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
import { Player } from "../Player";

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
      <ListItem style={{ display: "inherit" }}>
        <div className={style.listitem}>
          {/* TODO:Imageタグに置き換える */}
          <Grid container spacing={2}>
            <Grid item container>
              <Grid item xs={10} md={10}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Player
                    audioUrl={preview_url}
                    id={songInfo.id}
                    imgUrl={img_url}
                    size={70}
                  />
                  <div style={{ paddingLeft: "16px" }}>
                    <Grid xs container direction="column">
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
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
                {showScore && <div>{getScoreIcon(songInfo.rank)}</div>}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ListItem>
    </List>
  );
}

SongListCard.defaultProps = {
  showScore: true,
};
