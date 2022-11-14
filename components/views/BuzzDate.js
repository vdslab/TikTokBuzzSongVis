import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedSong } from "../atoms";
import { getScoreIcon } from "./SongListCard";
import style from "./BuzzDate.module.css";

async function getSongBuzzDate(songId) {
  const dateReq = await fetch("/api/song_buzz_date", {
    method: "POST",
    body: JSON.stringify(songId),
  });
  const date = await dateReq.json();
  return date;
}

export default function BuzzDate() {
  const [selectedSongId, setSelectedSongId] = useRecoilState(selectedSong);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    (async () => {
      const date = await getSongBuzzDate(selectedSongId);
      setDateList(date);
    })();
  }, [selectedSongId]);

  return (
    <div>
      <div className={style.title}>ピックアップ履歴</div>
      {dateList.length > 0 ? (
        <div className={style.date_rank_list}>
          {dateList.map((data) => {
            return (
              <div key={data.date} className={style.date}>
                {data.date}
                <div className={style.rank}>{getScoreIcon(data.rank)}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>この曲はピックアップされたことはありません</div>
      )}
    </div>
  );
}
