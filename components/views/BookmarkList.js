import { useEffect, useState } from "react";
import { SongListCard } from "./SongListCard";
import { localStorageKey } from "../common";
import { useRecoilState } from "recoil";
import { bookmarkState, selectedSong } from "../atoms";
import { clickLikeList, inList } from "../hooks/bookMarkHook";
import style from "./SongDetail.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import listStyle from "./BuzzSongs.module.css";
import { Box } from "@material-ui/core";
import { getShowList } from "./SongList";
import { MINI_DISPLAY_SIZE } from "../common";
import { useWindowSize } from "../hooks/getWindwSize";
import songListStyle from "./SongList.module.css";

async function getSongBasicInfo(songId) {
  try {
    const songInfoReq = await fetch("/api/song_basic_info", {
      method: "POST",
      body: JSON.stringify(songId),
    });
    const songInfo = await songInfoReq.json();
    return songInfo;
  } catch (error) {
    // データベースになければspotifyからとってくる
    const songInfoReq = await fetch("/api/bebebe/song_info", {
      method: "POST",
      body: JSON.stringify(songId),
    });
    const songInfo = await songInfoReq.json();
    return songInfo;
  }
}

export default function BookmarkList() {
  const [likeIdList, setLikeIdList] = useRecoilState(bookmarkState);
  const [likeSongInfoList, setLikeSongInfoList] = useState(null);
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  const [isShortList, setIsShortList] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > MINI_DISPLAY_SIZE) {
      setIsShortList(false);
    }
  }, [width]);

  useEffect(() => {
    (async () => {
      const songlist = localStorage.getItem(localStorageKey.BUZZLEAD_LIKE_LIST);
      const parsedSongIdList = JSON.parse(songlist);
      setLikeIdList(parsedSongIdList);

      const songInfoList = [];
      if (parsedSongIdList) {
        for (const id of parsedSongIdList) {
          const song = await getSongBasicInfo(id);
          songInfoList.push(song);
        }
        setSelectedSongId(songInfoList[0].id);
      }
      setLikeSongInfoList(songInfoList);
    })();
  }, [setLikeSongInfoList, setLikeIdList]);

  if (likeSongInfoList === null) {
    return (
      <div>
        <div className={listStyle.title}>お気に入り</div>
        <div className={style.loading}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <Box component="main">
      <div className={listStyle.title}>お気に入り</div>
      <div className={songListStyle.song_list}>
        {/* TODO:SongListと共通化 */}
        {likeSongInfoList.length === 0 ? (
          <div>登録されていません。</div>
        ) : (
          getShowList(likeSongInfoList, isShortList, 6).map((song) => {
            return (
              <SongListCard
                songInfo={song}
                key={song.id}
                like={inList(likeIdList, song.id)}
                showScore={false}
                clickLikeList={() => {
                  const adjustedIdList = clickLikeList(likeIdList, song.id);
                  setLikeIdList(adjustedIdList);
                  const adjustedSongList = likeSongInfoList.filter(
                    (like) => like.id !== song.id
                  );
                  setLikeSongInfoList(adjustedSongList);
                }}
              />
            );
          })
        )}
        {width <= MINI_DISPLAY_SIZE && (
          <div
            className={songListStyle.show_list}
            onClick={() => setIsShortList(!isShortList)}
          >
            {isShortList ? "もっと見る ▼" : "一部を表示 ▲"}
          </div>
        )}
      </div>
    </Box>
  );
}
