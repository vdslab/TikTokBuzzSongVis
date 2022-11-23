import Header from "../../components/layouts/Header";
import BookmarkList from "../../components/views/BookmarkList";
import SongDetail from "../../components/views/SongDetail";
import { Grid } from "@material-ui/core";
import { MINI_DISPLAY_SIZE } from "../../components/common";

export default function DefaultSizeDisplay({ id, songData }) {
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
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <BookmarkList />
          </Grid>
          <Grid item xs={8}>
            <SongDetail key={id} selectedId={id} songDataTest={songData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

async function getSongData(songId) {
  const songInfoReq = await fetch(
    "http://localhost:3000/api/bebebe/song_info",
    {
      method: "POST",
      body: JSON.stringify(songId),
    }
  );
  if (songInfoReq) {
    const songInfo = await songInfoReq.json();
    return songInfo;
  }
  return {};
}

export async function getStaticProps(context) {
  const id = context.params.id === "favicon.ico" ? "" : context.params.id;
  const data = await getSongData(id);

  return {
    props: { id: id, songData: data },
    revalidate: 10,
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
