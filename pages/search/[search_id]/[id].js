import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import Header from "../../../components/layouts/Header";
import SongDetail from "../../../components/views/SongDetail";
import BuzzPossibility from "../../../components/views/BuzzPossibility";

//PC専用
export default function DefaultSizeHomge() {
  const [songData, setSongData] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const searchId = router.query.search_id;

  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/song_buzz_score", {
        method: "POST",
        body: JSON.stringify(searchId),
      });
      const data = await songReq.json();
      setSongData(data);
    })();
  }, [searchId]);

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
                showHeader={true}
                searchId={searchId}
                key={searchId}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <SongDetail key={id} selectedId={id} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
