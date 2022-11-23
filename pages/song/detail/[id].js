import SongDetail from "../../../components/views/SongDetail";
import { useRouter } from "next/router";
import Header from "../../../components/layouts/Header";

/**
 * スマホ用の曲詳細画面
 */
export default function Home() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <div>
      <Header />
      <SongDetail key={id} routeUrl={id} />
    </div>
  );
}
