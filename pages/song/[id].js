import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";
import BuzzPossibility from "../../components/views/BuzzPossibility";
import { useWindowSize } from "../../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../../components/common";
import { Grid } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selectedSong } from "../../components/atoms";

function DefaultSizeHomge() {
  const [songData, setSongData] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);

  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/song_buzz_score", {
        method: "POST",
        body: JSON.stringify(id),
      });
      const data = await songReq.json();
      setSongData(data);
      setSelectedSongId(id);
    })();
  }, [id]);

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
            {songData && (
              <BuzzPossibility songData={songData} showHeader={true} />
            )}
          </Grid>
          <Grid item xs={8}>
            <SongDetail key={selectedSongId} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function MiniSizeHome() {
  const [songData, setSongData] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);

  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/song_buzz_score", {
        method: "POST",
        body: JSON.stringify(id),
      });
      const data = await songReq.json();
      setSongData(data);
      setSelectedSongId(id);
    })();
  }, [id]);

  return (
    <div>
      <Header />
      <SongDetail key={selectedSongId} showScore={true} routeUrl={id} />
      {songData && (
        <div style={{ padding: "0 1rem" }}>
          <BuzzPossibility songData={songData} showHeader={false} />
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { width } = useWindowSize();
  if (width > MINI_DISPLAY_SIZE) {
    return <DefaultSizeHomge />;
  } else {
    return <MiniSizeHome />;
  }
}
