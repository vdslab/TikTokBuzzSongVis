import { atom } from "recoil";

export const bookmarkState = atom({
  key: "bookmark",
  default: [],
});
