import { useEffect, useState } from "react";
import { getScoreIcon } from "./SongListCard";
import style from "./BuzzDate.module.css";

async function getSongBuzzDate(songId) {
  try {
    const dateReq = await fetch("/api/song_buzz_date", {
      method: "POST",
      body: JSON.stringify(songId),
    });

    const date = await dateReq.json();
    return date;
  } catch {
    return [];
  }
}

export default function BuzzDate({ selectedId }) {
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    (async () => {
      if (selectedId) {
        const date = await getSongBuzzDate(selectedId);
        setDateList(date);
      }
    })();
  }, [selectedId]);

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
        <div>なし</div>
      )}
    </div>
  );
}
