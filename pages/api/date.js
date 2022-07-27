/**
 * buzzSongsの日付を返す
 */
export default async function (req, res) {
  const response = await fetch(
    "https://tsubame.hasura.app/api/rest/buzz_songs_dates",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "6PNFERlyk62gf0o1kEmN2gBg4Iu0W83ywE72UqrtiXMBA3DFOkAVd4nh09e6KnyV",
      },
    }
  );
  const data = await response.json();
  const date = data["buzz_songs"].map((d) => d.date);

  res.status(200).json(date);
}
