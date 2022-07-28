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
        <BuzzSongs
          selectedSongId={selectedSongId}
          setSelectedSongId={setSelectedSongId}
        />
        <SongDetail songId={selectedSongId} />
      </div>
    </div>
  );
}
