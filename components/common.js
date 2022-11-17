import style from "./views/InfoPopup.module.css";
import { getScoreIcon } from "./views/SongListCard";

export const MINI_DISPLAY_SIZE = 700;
export const MUI_BREAK_POINT_MD = 960;
export const localStorageKey = { BUZZLEAD_LIKE_LIST: "BUZZLEAD_LIKE_LIST" };

export function BuzzIconLegend() {
  return (
    <div className={style.buzz_score_icon_wrapper}>
      <div className={style.buzz_score_txt}>低</div>
      {[0, 33, 66, 100].map((value) => {
        return <div key={value}>{getScoreIcon(value)}</div>;
      })}
      <div className={style.buzz_score_txt}>高</div>
    </div>
  );
}
