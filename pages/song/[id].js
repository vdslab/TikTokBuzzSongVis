import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";
import BuzzPossibility from "../../components/views/BuzzPossibility";

export default function Home() {
  const [songData, setSongData] = useState(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    (async () => {
      const songReq = await fetch("/api/bebebe/song_buzz_score", {
        method: "POST",
        // TODO:ここの引数のdateをユーザーが変更できるように
        body: JSON.stringify(id),
      });
      const data = await songReq.json();
      console.log(data);
      setSongData(data);
    })();
  }, [id]);

  console.log("songData", songData);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <div>
          {songData !== undefined && <BuzzPossibility songData={songData} />}
        </div>
        <div style={{ paddingLeft: "32px", width: "80%" }}>
          <SongDetail songId={id} hasData={false} />
        </div>
      </div>
    </div>
  );
}
