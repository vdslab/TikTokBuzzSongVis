import { ListItem, List, Grid, Typography } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Player } from "../Player";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { MINI_DISPLAY_SIZE } from "../common";
import { useWindowSize } from "../hooks/getWindwSize";

export function getScoreIcon(score) {
  const numScore = Number(score);
  if (numScore === 100) {
    return <SentimentVerySatisfiedOutlinedIcon />;
  } else if (numScore === 66) {
    return <SentimentSatisfiedOutlinedIcon />;
  } else if (numScore === 33) {
    return <SentimentSatisfiedIcon />;
  }
  return <SentimentVeryDissatisfiedIcon />;
}

export function SongListCard({
  songInfo,
  clickLikeList,
  like,
  showScore,
  home,
}) {
  const router = useRouter();
  const { width } = useWindowSize();
  //TODO:返ってくるデータの形を同じにしておきたい
  const title = songInfo.detail ? songInfo.detail.title : songInfo.title;
  const img_url = songInfo.detail ? songInfo.detail.img_url : songInfo.img_url;
  const artist = songInfo.detail ? songInfo.detail.artist : songInfo.artist;
  const preview_url = songInfo.detail
    ? songInfo.detail.preview_url
    : songInfo.preview_url;

  function showSelectIdSong(id) {
    if (home) {
      router.push(`/${id}`);
    } else {
      if (MINI_DISPLAY_SIZE < width) {
        const searchedId = router.query.id;
        router.push(`/search/${searchedId}/${id}`);
      } else {
        router.push(`/search_sp/${id}`);
      }
    }
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
                    <Grid container direction="column">
                      <Grid
                        item
                        xs
                        onClick={() => {
                          showSelectIdSong(songInfo.id);
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
