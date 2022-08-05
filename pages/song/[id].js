import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";
import BuzzPossibility from "../../components/views/BuzzPossibility";

export default function Home() {
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
      <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <div>
          {songData && (
            <BuzzPossibility
              songData={songData}
              setSelectedSongId={setSelectedSongId}
              key={id}
            />
          )}
        </div>
        <div style={{ paddingLeft: "32px", width: "80%" }}>
          <SongDetail
            songId={selectedSongId}
            hasData={false}
            key={selectedSongId}
          />
        </div>
      </div>
    </div>
  );
}
