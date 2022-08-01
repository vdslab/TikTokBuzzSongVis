export default async function (req, res) {
  const date = JSON.parse(req.body);

  const response = await fetch(
    "https://tsubame.hasura.app/api/rest/buzz_songs/date",
    {
      method: "POST",
      body: JSON.stringify({ date: date }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
      },
    }
  );
  const data = await response.json();

  res.status(200).send(data["buzz_songs"]);
}
