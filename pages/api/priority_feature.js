export default async function getPriorityFeature(req, res) {
  const date = JSON.parse(req.body);

  const response = await fetch(
    "https://tsubame.hasura.app/api/rest/priority_feature/date",
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

  res.status(200).send(data["priority_feature"][0]);
}
