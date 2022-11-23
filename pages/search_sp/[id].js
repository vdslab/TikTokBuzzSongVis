import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";
import BuzzPossibility from "../../components/views/BuzzPossibility";

//スマホ専用
export default function MiniSizeHome() {
  const [songData, setSongData] = useState(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/song_buzz_score", {
        method: "POST",
        body: JSON.stringify(id),
      });
      const data = await songReq.json();
      setSongData(data);
    })();
  }, [id]);

  return (
    <div>
      <Header />
      <SongDetail
        key={id}
        showScore={true}
        routeUrl={id}
        selectedId={id}
        hasScore={songData?.rank}
      />
      {songData && (
        <div style={{ padding: "0 1rem" }}>
          <BuzzPossibility songData={songData} showHeader={false} />
        </div>
      )}
    </div>
  );
}
