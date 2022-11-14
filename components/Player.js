import { useState } from "react";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import style from "./Player.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export function Player({ audioUrl, id, imgUrl, size }) {
  const [play, setPlay] = useState(true);

  function Playing() {
    const bgm1 = document.querySelector(`#bgm${id}`);
    // 何が丁度いい？
    bgm1.volume = 0.1;
    bgm1.addEventListener("ended", function () {
      setPlay(true);
    });
    if (bgm1?.paused !== true) {
      setPlay(true);
      bgm1.pause();
    } else {
      setPlay(false);
      bgm1.play();
    }
  }

  return (
    <div>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
        }}
      >
        <img
          src={imgUrl ? imgUrl : "/images/no_image.png"}
          style={{ width: `${size}px` }}
        />
        <div className={style.control}>
          <audio id={`bgm${id}`} src={audioUrl} />
          <div
            className={style.button}
            onClick={() => {
              Playing();
            }}
          >
            {play ? (
              <PlayArrowIcon fontSize="large" />
            ) : (
              <PauseOutlinedIcon fontSize="large" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
