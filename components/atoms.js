import { atom } from "recoil";

export const bookmarkState = atom({
  key: "bookmark",
  default: [],
});

export const selectedSong = atom({
  key: "selectedSong",
  default: {
    id: null,
    info: null,
  },
});
