import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedSong } from "../atoms";

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
      {dateList.length > 0 ? (
        dateList.map((data) => {
          return (
            <div key={data.date}>
              {data.date} スコア：{data.rank}
            </div>
          );
        })
      ) : (
        <div>この曲はピックアップされたことはありません</div>
      )}
    </div>
  );
}
