import { atom } from "recoil";

export const bookmarkState = atom({
  key: "bookmark",
  default: [],
});

export const playingMusicState = atom({
  key: "musicId",
  default: null,
});
