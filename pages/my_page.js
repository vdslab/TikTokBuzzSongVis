import Header from "../components/layouts/Header";
import BookmarkList from "../components/views/BookmarkList";
import SongDetail from "../components/views/SongDetail";
import { useRecoilState } from "recoil";
import { selectedSong } from "../components/atoms";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";
import { Grid } from "@material-ui/core";

function MiniSizeDisplay() {
  return (
    <div>
      <Header />
      <div style={{ padding: "0 1rem" }}>
        <BookmarkList />
      </div>
    </div>
  );
}

function DefaultSizeDisplay() {
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "1rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <BookmarkList />
          </Grid>
          <Grid item xs={8}>
            {selectedSongId && <SongDetail key={selectedSongId} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default function MyPage() {
  const { height, width } = useWindowSize();
  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeDisplay /> : <MiniSizeDisplay />}
    </div>
  );
}
