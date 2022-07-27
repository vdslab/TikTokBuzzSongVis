import { useEffect, useState } from "react";

export default function BuzzSongs({ setSelectedSongId }) {
  const [date, setDate] = useState([]);
  const [buzzSongList, setBuzzSongList] = useState([]);

  useEffect(() => {
    (async () => {
      const dateRes = await fetch("/api/date");
      const data = await dateRes.json();
      setDate(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (date.length > 0) {
        const buzzSongsRes = await fetch("api/buzz_songs", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(date[0]),
        });
        // TODO:rank->title順での並び替え（現状ではrankでのみ）
        const data = await buzzSongsRes.json();
        setBuzzSongList(data);
      }
    })();
  }, [date]);

  return (
    <div>
      <div>buzzSongsView title</div>
      {buzzSongList.map((data, idx) => {
        return (
          <div key={idx}>
            <div
              onClick={() => {
                setSelectedSongId(data.id);
                console.log("click");
              }}
            >
              {data.detail.title}
            </div>
            <div>{data.detail.artist}</div>
            <audio controls src={data.detail.preview_url}></audio>
          </div>
        );
      })}
    </div>
  );
}
