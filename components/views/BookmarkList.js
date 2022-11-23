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
import { MINI_DISPLAY_SIZE, routeKey } from "../common";
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
      if (parsedSongIdList?.length > 0) {
        for (const id of parsedSongIdList) {
          const song = await getSongBasicInfo(id);
          songInfoList.push(song);
        }
        setSelectedSongId(songInfoList[0].id);
      } else {
        setSelectedSongId(null);
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
      <div className={listStyle.bookmark_title}>お気に入り</div>
      <div>
        {/* TODO:SongListと共通化 */}
        {likeSongInfoList.length === 0 ? (
          <div style={{ padding: "0 0px" }}>登録されていません。</div>
        ) : (
          <div className={songListStyle.song_list}>
            {getShowList(likeSongInfoList, isShortList, 6).map((song) => {
              return (
                <SongListCard
                  songInfo={song}
                  key={song.id}
                  like={inList(likeIdList, song.id)}
                  showScore={false}
                  route={routeKey.MY_PAGE}
                  clickLikeList={() => {
                    const adjustedIdList = clickLikeList(likeIdList, song.id);
                    setLikeIdList(adjustedIdList);
                    const adjustedSongList = likeSongInfoList.filter(
                      (like) => like.id !== song.id
                    );
                    setLikeSongInfoList(adjustedSongList);
                    if (adjustedIdList.length === 0) {
                      // リストが空になったらselectedSongIdをリセット
                      setSelectedSongId(null);
                    } else if (!adjustedIdList.includes(selectedSongId)) {
                      // selectedSongIdがリストに含まれていなければ先頭の曲をセット
                      setSelectedSongId(adjustedIdList[0]);
                    }
                  }}
                />
              );
            })}
            {width <= MINI_DISPLAY_SIZE && likeSongInfoList.length >= 6 && (
              <div
                className={songListStyle.show_list}
                onClick={() => setIsShortList(!isShortList)}
              >
                {isShortList ? "もっと見る ▼" : "一部を表示 ▲"}
              </div>
            )}
          </div>
        )}
      </div>
    </Box>
  );
}
