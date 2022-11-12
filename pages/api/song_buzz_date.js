/**
 * buzzSongに登場した年月日を返す
 */
export default async function (req, res) {
  const id = JSON.parse(req.body);

  const response = await fetch(
    "https://tsubame.hasura.app/api/rest/buzz_song/date",
    {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
      },
    }
  );
  const data = await response.json();

  res.status(200).send(data["buzz_songs"]);
}
