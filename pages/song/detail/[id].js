import SongDetail from "../../../components/views/SongDetail";
import { useRouter } from "next/router";
import Header from "../../../components/layouts/Header";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedSong } from "../../../components/atoms";

/**
 * スマホ用の曲詳細画面
 */
export default function Home() {
  const router = useRouter();
  const id = router.query.id;
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);

  useEffect(() => {
    setSelectedSongId(id);
  });

  //TODO:ぬまけい調整お願いします
  return (
    <div>
      <Header />
      <SongDetail hasData={false} key={id} />
    </div>
  );
}
