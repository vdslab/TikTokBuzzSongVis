import request from "request";
//Note:クライアント側で変数を使うときは`NEXT_PUBLIC_`が必要
const spotify = {
  ClientId: process.env.SPOTIFY_CLIENT_ID,
  ClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

// HACK:fetchで書けるはず？tokenをどこかに保存しておきたい
async function getToken() {
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

  const rqt = () => {
    return new Promise((resolve, reject) => {
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body.access_token);
        }
      });
    });
  };

  const body = await rqt();
  return body;
}

export default async function playlists(req, res) {
  const songName = JSON.parse(req.body);
  const token = await getToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${songName}&type=track&market=JP`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    }
  );

  const data = await response.json();
  if (data.tracks?.items) {
    res.status(200).json(data.tracks.items);
  } else {
    res.status(200).json([]);
  }
}
