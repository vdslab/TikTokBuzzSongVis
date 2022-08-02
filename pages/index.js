import { useState } from "react";
import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";

export default function Home() {
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
          <SongDetail songId={selectedSongId} />
        </div>
      </div>
    </div>
  );
}
