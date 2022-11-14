import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

export function Player({ url, id, imgUrl }) {
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
      <audio id={`bgm${id}`} src={url} />
      <IconButton
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
  );
}
