import Header from "../components/layouts/Header";
import BookmarkList from "../components/views/BookmarkList";
import SongDetail from "../components/views/SongDetail";
import { useRecoilState } from "recoil";
import { selectedSong } from "../components/atoms";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";

function MiniSizeDisplay() {
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  return (
    <div>
      <Header />
      <BookmarkList />
    </div>
  );
}

function DefaultSizeDisplay() {
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  return (
    <div>
      <Header />
      <BookmarkList />
      <SongDetail key={selectedSongId} />
    </div>
  );
}

export default function MyPage() {
  const { height, width } = useWindowSize();
  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeDisplay /> : <MiniSizeDisplay />}
    </div>
  );
}
