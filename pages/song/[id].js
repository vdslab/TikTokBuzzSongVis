import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";
import BuzzPossibility from "../../components/views/BuzzPossibility";
import { useWindowSize } from "../../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../../components/common";
import { Grid } from "@material-ui/core";

function DefaultSizeHomge() {
  const [songData, setSongData] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const [selectedSongId, setSelectedSongId] = useState(null);

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
              <BuzzPossibility
                songData={songData}
                setSelectedSongId={setSelectedSongId}
                key={id}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <SongDetail
              songId={selectedSongId}
              hasData={false}
              key={selectedSongId}
            />
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
  const [selectedSongId, setSelectedSongId] = useState(null);

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
      {songData && (
        <BuzzPossibility
          songData={songData}
          setSelectedSongId={setSelectedSongId}
          key={id}
        />
      )}
      <SongDetail
        songId={selectedSongId}
        hasData={false}
        key={selectedSongId}
      />
    </div>
  );
}

export default function Home() {
  const { height, width } = useWindowSize();
  if (width > MINI_DISPLAY_SIZE) {
    return <DefaultSizeHomge />;
  } else {
    return <MiniSizeHome />;
  }
}
