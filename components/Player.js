import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import style from "./Player.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { playingMusicState } from "./atoms";
import { useRecoilState } from "recoil";

export function Player({ audioUrl, id, imgUrl, size }) {
  const [playingMusicId, setPlayingMusicId] = useRecoilState(playingMusicState);

  function stopPlayingMusic() {
    const playingBgm = document.querySelector(`#bgm${playingMusicId}`);
    playingBgm.addEventListener("ended", function () {
      setPlayingMusicId(null);
    });

    playingBgm.pause();
    playingBgm.currentTime = 0;
    setPlayingMusicId(null);
  }

  function Playing() {
    if (playingMusicId !== id && playingMusicId !== null) {
      stopPlayingMusic();
    }

    const bgm1 = document.querySelector(`#bgm${id}`);
    // 何が丁度いい？
    bgm1.volume = 0.2;
    bgm1.addEventListener("ended", function () {
      setPlayingMusicId(null);
    });
    if (bgm1?.paused !== true) {
      bgm1.pause();
      bgm1.currentTime = 0;
      setPlayingMusicId(null);
    } else {
      bgm1.play();
      setPlayingMusicId(id);
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
        {audioUrl ? (
          <div className={style.control}>
            <audio id={`bgm${id}`} src={audioUrl} />
            <div
              className={style.button}
              onClick={() => {
                Playing();
              }}
            >
              {id !== playingMusicId ? (
                <PlayArrowIcon fontSize="large" style={{ color: "white" }} />
              ) : (
                <PauseOutlinedIcon
                  fontSize="large"
                  style={{ color: "white" }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={style.no_audio}>
            <div className={style.no_audio_text}>再生できません</div>
          </div>
        )}
      </div>
    </div>
  );
}
