import ResponseCache from "next/dist/server/response-cache";
import request from "request";
//Note:クライアント側で変数を使うときは`NEXT_PUBLIC_`が必要
const spotify = {
  ClientId: process.env.SPOTIFY_CLIENT_ID,
  ClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

export default async function (req, res) {
  const songName = JSON.parse(req.body);

  (async () => {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(spotify.ClientId + ":" + spotify.ClientSecret).toString(
            "base64"
          ),
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };
    console.log("songName", songName);
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const token = body.access_token;
        const options = {
          url: `https://api.spotify.com/v1/search?q=${songName}&type=track`,
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        };
        request.get(options, function (error, response, body) {
          console.log("response", response);
          res.status(200).end();
          // res.end();
          // console.log("body", body);
          // if (body) {
          //   res.status(200).send(body.tracks.items);
          // } else {
          //   res.status(200).send({});
          // }
        });
      }
    });
  })();
  res.status(200).end();
}
