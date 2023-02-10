export default async function hoge(req, res) {
  const word = JSON.parse(req.body);
  const payload = {
    app_id: process.env.HIRAGANA_API_KEY,
    sentence: word,
    output_type: "hiragana",
  };

  const response = await fetch("https://labs.goo.ne.jp/api/hiragana", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.status(200).send(data);
}
