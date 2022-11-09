/**
 * songの基本情報を返す
 */
export default async function (req, res) {
  const id = JSON.parse(req.body);

  const response = await fetch(
    "https://tsubame.hasura.app/api/rest/song/basic",
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

  if (data["songs"].length > 0) {
    res.status(200).send(data["songs"][0]);
  } else {
    throw new Error("データがありません");
  }
}
