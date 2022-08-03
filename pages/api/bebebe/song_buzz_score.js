import { sampleData } from "./sampleData/songData";

export default async function getSongBuzzScore(req, res) {
  const id = JSON.parse(req.body);

  // HACK:これでええんか？
  const data = await fetch(
    `${process.env.API_ENDPOINT}/song_buzz_score/${id}`,
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
      return sampleData;
    });

  res.status(200).json(data);
}
