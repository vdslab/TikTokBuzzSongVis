import Header from "../components/layouts/Header";
import BookmarkList from "../components/views/BookmarkList";
import SongDetail from "../components/views/SongDetail";
import { useRecoilState } from "recoil";
import { selectedSong } from "../components/atoms";

export default function MyPage() {
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  return (
    <div>
      <Header />
      <BookmarkList />
      <SongDetail showDate={true} key={selectedSongId} />
    </div>
  );
}
