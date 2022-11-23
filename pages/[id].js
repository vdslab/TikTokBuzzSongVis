import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";
import { Grid } from "@material-ui/core";

function DefaultSizeHome({ songData, id }) {
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
            <SongDetail key={id} selectedId={id} songDataTest={songData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function MiniSizeHome({ id }) {
  return (
    <div>
      <Header />
      <SongDetail key={id} selectedId={id} />
    </div>
  );
}

export default function Home(props) {
  const { width } = useWindowSize();

  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? (
        <DefaultSizeHome songData={props.songData} id={props.id} />
      ) : (
        <MiniSizeHome id={props.id} />
      )}
    </div>
  );
}

export async function getSongData(songId) {
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
  console.log("context", context);
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
