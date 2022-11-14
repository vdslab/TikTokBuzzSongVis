import { useState } from "react";
import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";
import { useRecoilState } from "recoil";
import { selectedSong } from "../components/atoms";
import { Grid } from "@material-ui/core";

function DefaultSizeHome() {
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
          paddingBottom: "2rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <BuzzSongs
              selectedSongId={selectedSongId}
              setSelectedSongId={setSelectedSongId}
            />
          </Grid>
          <Grid item xs={8}>
            <SongDetail hasData={true} key={selectedSongId} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function MiniSizeHome() {
  const [selectedSongId, setSelectedSongId] = useState(null);
  // TODO:ぬまけいよろしく
  return (
    <div>
      <Header />
      <BuzzSongs />
    </div>
  );
}

export default function Home() {
  const { height, width } = useWindowSize();
  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeHome /> : <MiniSizeHome />}
    </div>
  );
}
