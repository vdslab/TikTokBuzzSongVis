import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import style from "./Player.module.css";

export function Player({ audioUrl, id, imgUrl }) {
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
      <div style={{ width: "100px", height: "100px", position: "relative" }}>
        <img
          src={imgUrl ? imgUrl : "/images/no_image.png"}
          style={{ width: "100px" }}
        />
        <div className={style.control}>
          <audio id={`bgm${id}`} src={audioUrl} />
          <IconButton
            style={{ color: "rgb(250, 58, 96)" }}
            size="large"
            id={`btn${id}-play`}
            onClick={() => {
              Playing();
            }}
          >
            {play ? (
              <ArrowRightOutlinedIcon fontSize="large" />
            ) : (
              <PauseOutlinedIcon fontSize="large" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
