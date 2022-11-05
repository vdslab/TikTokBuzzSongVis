import { useState } from "react";
import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";

function DefaultSizeHome() {
  const [selectedSongId, setSelectedSongId] = useState(null);
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "1rem",
        }}
      >
        <div style={{ width: "30%" }}>
          <BuzzSongs
            selectedSongId={selectedSongId}
            setSelectedSongId={setSelectedSongId}
          />
        </div>
        <div style={{ paddingLeft: "30px", width: "70%" }}>
          <SongDetail
            songId={selectedSongId}
            hasData={true}
            key={selectedSongId}
          />
        </div>
      </div>
    </div>
  );
}

function MiniSizeHome() {
  const [selectedSongId, setSelectedSongId] = useState(null);
  // TODO:ぬまけいよろしく
  return (
    <div>
      <Header />
      <BuzzSongs
        selectedSongId={selectedSongId}
        setSelectedSongId={setSelectedSongId}
      />
    </div>
  );
}

export default function Home() {
  const { height, width } = useWindowSize();

  if (width > MINI_DISPLAY_SIZE) {
    return <DefaultSizeHome />;
  } else {
    return <MiniSizeHome />;
  }
}
