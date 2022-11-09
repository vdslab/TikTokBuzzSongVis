import { useState } from "react";
import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import SongDetail from "../components/views/SongDetail";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";
import { useRecoilState } from "recoil";
import { selectedSong } from "../components/atoms";

function DefaultSizeHome() {
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
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
          <BuzzSongs />
        </div>
        <div style={{ paddingLeft: "30px", width: "70%" }}>
          {/* MEMO:ローディングを出すためkeyをつけている */}
          <SongDetail key={selectedSongId} />
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
      <BuzzSongs />
    </div>
  );
}

export default function Home() {
  const { height, width } = useWindowSize();
  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeHome /> : <MiniSizeHome />}
    </div>
  );
}
