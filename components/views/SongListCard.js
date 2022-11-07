import { ListItem, List } from "@material-ui/core";
import style from "./BuzzSongs.module.css";
import { MINI_DISPLAY_SIZE } from "../common";
import { useWindowSize } from "../hooks/getWindwSize";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function SongListCard({
  songInfo,
  setSelectedSongId,
  clickLikeList,
  like,
}) {
  const { height, width } = useWindowSize();
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
          <div className={style.images_names}>
            <img
              src={img_url}
              style={{ width: "50px", height: "50px" }}
              alt=""
              className={style.image}
            ></img>
            {/* <Image src={songInfo.detail.img_url} width={50} height={50} /> */}
            <div className={style.names}>
              <div
                className={style.name_score}
                onClick={() => {
                  if (width > MINI_DISPLAY_SIZE) {
                    setSelectedSongId(songInfo.id);
                  } else {
                    showSelectIdSong(songInfo.id);
                  }
                }}
              >
                <div>{title}</div>
              </div>
              <div
                onClick={() => {
                  if (width > MINI_DISPLAY_SIZE) {
                    setSelectedSongId(songInfo.id);
                  } else {
                    showSelectIdSong(songInfo.id);
                  }
                }}
              >
                {artist}
              </div>
              <div className={style.score_fav}>
                <div>{songInfo.rank}点</div>
                <IconButton
                  style={{
                    color: like ? "rgb(250, 58, 96)" : "white",
                    stroke: like ? "none" : "gray",
                    cursor: "pointer",
                    width: "24px",
                    height: "24px",
                  }}
                  onClick={() => {
                    clickLikeList(songInfo.id);
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </div>

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
            </div>
          </div>
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

          <audio controls src={preview_url}></audio>
        </div>
      </ListItem>
    </List>
  );
}
