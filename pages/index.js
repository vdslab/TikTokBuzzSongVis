import Header from "../components/layouts/Header";
import BuzzSongs from "../components/views/BuzzSongs";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { MINI_DISPLAY_SIZE } from "../components/common";
import { useRouter } from "next/router";
import { useEffect } from "react";

function DefaultSizeHome() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const dateRes = await fetch("/api/date");
      const date = await dateRes.json();
      if (date.length > 0) {
        const buzzSongsReq = await fetch("api/buzz_songs", {
          method: "POST",
          body: JSON.stringify(date[0]),
        });

        const data = await buzzSongsReq.json();
        router.replace(`/${data[0].id}`);
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      loading...
    </div>
  );
}

function MiniSizeHome() {
  return (
    <div>
      <Header />
      <BuzzSongs />
    </div>
  );
}

export default function Home() {
  const { width } = useWindowSize();
  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeHome /> : <MiniSizeHome />}
    </div>
  );
}
