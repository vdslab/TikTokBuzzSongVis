export default async function getSongInfo(req, res) {
  const id = JSON.parse(req.body);

  // HACK:これでええんか？
  const data = await fetch(
    `${process.env.API_ENDPOINT}/similar_buzz_songs/${id}`,
    {
      method: "GET",
      json: true,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("データの取得に失敗しました。", error);
      return [];
    });

  res.status(200).json(data);
}
