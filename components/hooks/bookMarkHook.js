import { localStorageKey } from "../common";

export function clickLikeList(likeList, selectedId) {
  let adjustedList;
  if (inList(likeList, selectedId)) {
    // リストにあればお気に入り削除
    adjustedList = likeList.filter((id) => id !== selectedId);
  } else {
    // リストになければお気に入り登録
    adjustedList = likeList.concat([selectedId]);
  }
  localStorage.setItem(
    localStorageKey.BUZZLEAD_LIKE_LIST,
    JSON.stringify(adjustedList)
  );
  return adjustedList;
}

export function inList(list, id) {
  return list?.includes(id);
}
