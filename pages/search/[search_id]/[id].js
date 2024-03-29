import { Grid } from "@material-ui/core";
import Header from "../../../components/layouts/Header";
import SongDetail from "../../../components/views/SongDetail";
import BuzzPossibility from "../../../components/views/BuzzPossibility";
import { MINI_DISPLAY_SIZE } from "../../../components/common";

//PC専用
export default function DefaultSizeHomge({
  id,
  songData,
  searchId,
  searchSongData,
}) {
  return (
    <div style={{ minWidth: `${MINI_DISPLAY_SIZE}px` }}>
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
            {searchSongData && (
              <BuzzPossibility
                songData={searchSongData}
                showHeader={true}
                searchId={searchId}
                key={searchId}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <SongDetail key={id} selectedId={id} songDataTest={songData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

async function getSongData(id) {
  const songReq = await fetch(
    `${process.env.CLIENT_ENDPOINT}/api/bebebe/song_buzz_score`,
    {
      method: "POST",
      body: JSON.stringify(id),
    }
  );
  const data = await songReq.json();
  return data;
}

export async function getStaticProps(context) {
  const searchId =
    context.params.id === "favicon.ico" ? "" : context.params.search_id;
  const searchSongData = await getSongData(searchId);
  const id = context.params.id === "favicon.ico" ? "" : context.params.id;
  const data = await getSongData(id);

  return {
    props: {
      id: id,
      songData: data,
      searchId: searchId,
      searchSongData: searchSongData,
    },
    revalidate: 86400,
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
