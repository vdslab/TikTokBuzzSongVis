export default async function (req, res) {
  const id = JSON.parse(req.body);

  const response = await fetch("https://tsubame.hasura.app/api/rest/song/id", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "6PNFERlyk62gf0o1kEmN2gBg4Iu0W83ywE72UqrtiXMBA3DFOkAVd4nh09e6KnyV",
    },
  });
  const data = await response.json();

  res.status(200).send(data["songs"][0]);
}
