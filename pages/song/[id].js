import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";
import BuzzPossibility from "../../components/views/BuzzPossibility";
import { useWindowSize } from "../../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../../components/common";
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
      <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <div>{songData && <BuzzPossibility songData={songData} />}</div>
        <div style={{ paddingLeft: "32px", width: "80%" }}>
          <SongDetail hasData={false} key={selectedSongId} />
        </div>
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
      {songData && <BuzzPossibility songData={songData} />}
      <SongDetail hasData={false} key={selectedSongId} />
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
