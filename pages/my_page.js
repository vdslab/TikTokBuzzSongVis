import Header from "../components/layouts/Header";
import BookmarkList from "../components/views/BookmarkList";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { localStorageKey, MINI_DISPLAY_SIZE } from "../components/common";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MiniSizeDisplay() {
  return (
    <div>
      <Header />
      <div style={{ padding: "0 1rem" }}>
        <BookmarkList />
      </div>
    </div>
  );
}

function DefaultSizeDisplay() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const songlist = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
      const parsedSongIdList = JSON.parse(songlist);
      router.replace(`/my_page/${parsedSongIdList[0]}`);
    })();
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default function MyPage() {
  const { width } = useWindowSize();
  return (
    <div>
      {width > MINI_DISPLAY_SIZE ? <DefaultSizeDisplay /> : <MiniSizeDisplay />}
    </div>
  );
}
