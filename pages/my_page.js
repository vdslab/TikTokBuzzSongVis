import Header from "../components/layouts/Header";
import BookmarkList from "../components/views/BookmarkList";
import { useWindowSize } from "../components/hooks/getWindwSize";
import { localStorageKey, MINI_DISPLAY_SIZE } from "../components/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

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
  const [hasMyList, setHasMyList] = useState(null);

  useEffect(() => {
    (async () => {
      const songlist = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
      const parsedSongIdList = JSON.parse(songlist);
      if (parsedSongIdList && parsedSongIdList.length > 0) {
        router.replace(`/my_page/${parsedSongIdList[0]}`);
        setHasMyList(true);
      } else {
        setHasMyList(false);
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      {hasMyList == false && (
        <Box component="main" sx={{ p: 3 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              paddingBottom: "8px",
            }}
          >
            お気に入り
          </div>

          <div
            style={{
              padding: "0 0px",
            }}
          >
            登録されていません。
          </div>
        </Box>
      )}
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
