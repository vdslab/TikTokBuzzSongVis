import SongDetail from "../../../components/views/SongDetail";
import { useWindowSize } from "../../../components/hooks/getWindwSize";
import { useRouter } from "next/router";
import Header from "../../../components/layouts/Header";

export default function Home() {
  const { height, width } = useWindowSize();
  const router = useRouter();
  const id = router.query.id;

  //TODO:ぬまけい調整お願いします

  return (
    <div>
      <Header />
      <SongDetail songId={id} hasData={false} key={id} />
    </div>
  );
}
