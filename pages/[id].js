import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";

function DefaultSizeHome() {
  const router = useRouter();
  const id = router.query.id;
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
            <BuzzSongs />
          </Grid>
          <Grid item xs={8}>
            <SongDetail key={id} selectedId={id} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function MiniSizeHome() {
  const router = useRouter();
  const id = router.query.id;
  return (
    <div>
      <Header />
      <SongDetail key={id} selectedId={id} />
    </div>
  );
}

export default function Home() {
  const { width } = useWindowSize();

  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeHome /> : <MiniSizeHome />}
    </div>
  );
}
