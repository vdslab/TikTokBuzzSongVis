import { useState } from "react";
import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";

export default function Home() {
  const [selectedSongId, setSelectedSongId] = useState(null);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", padding: "1rem" }}>
        <div>
          <BuzzSongs
            selectedSongId={selectedSongId}
            setSelectedSongId={setSelectedSongId}
          />
        </div>
        <div style={{ width: "50%" }}>
          <SongDetail songId={selectedSongId} />
        </div>
      </div>
    </div>
  );
}
