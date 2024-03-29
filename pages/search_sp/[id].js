import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import BuzzPossibility from "../../components/views/BuzzPossibility";

//スマホ専用
export default function MiniSizeHome({ id, songData }) {
  return (
    <div>
      <Header />
      <SongDetail
        key={id}
        showScore={true}
        routeUrl={id}
        selectedId={id}
        songDataTest={songData}
        hasScore={songData?.rank}
      />
      {songData && (
        <div style={{ padding: "0 1rem" }}>
          <BuzzPossibility
            songData={songData}
            showHeader={false}
            searchId={id}
          />
        </div>
      )}
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
