import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";

// import "./BuzzSongs.css";

const buzzSongList = [
  {
    id: "7ABfyynRwOeKPNGRs3VXtR",
    title: "陽キャJKに憧れる陰キャJKの歌",
    artist: "音莉飴",
    genres: ["japanese teen pop", "jirai kei"],
    preview_url:
      "https://p.scdn.co/mp3-preview/3f9c2088a5c9854c4d1d53662eb9fe554cb3bf42?cid=774b29d4f13844c495f206cafdad9c86",
  },
  {
    id: "0ai7K2rYiFvCOBCEdC9Qfm",
    title: "Let's Get Eat (feat. KOTETSU)",
    artist: "T-STONE",
    genres: ["album rock", "british invasion", "classic rock", "rock"],
    preview_url:
      "https://p.scdn.co/mp3-preview/4e38c9b4e18faa6eecf3a70f7e7deb387d51c0eb?cid=774b29d4f13844c495f206cafdad9c86",
  },
  {
    id: "7sRYDTjWTX00fd9BCOflLo",
    title: "ホワイトキス",
    artist: "鈴木鈴木",
    genres: ["japanese classical performance"],
    preview_url:
      "https://p.scdn.co/mp3-preview/4e38c9b4e18faa6eecf3a70f7e7deb387d51c0eb?cid=774b29d4f13844c495f206cafdad9c86",
  },
  {
    id: "6qn31XzTa6YKXs5FZpAPgP",
    title: "常緑",
    artist: "Chippoke Ohashi",
    genres: ["j-pop", "japanese alternative pop"],
    preview_url:
      "https://p.scdn.co/mp3-preview/414c5cba2ccf21cacc70c9926651336505d5aad2?cid=774b29d4f13844c495f206cafdad9c86",
  },
  {
    id: "5x67EAHDrso2bSXy5HWx0j",
    title: "勝たんしか症候群",
    artist: "たかやん",
    genres: ["men chika"],
    preview_url:
      "https://p.scdn.co/mp3-preview/5a29324dfe29980bb415ebd525752c3de9eddf62?cid=774b29d4f13844c495f206cafdad9c86",
  },
];

export default function BuzzSongs({ setSelectedSongId }) {
  //TODO:データベースからリストの取得
  return (
    <Box component="main">
      <div>buzzSongsView</div>
      {buzzSongList.map((data, idx) => {
        return (
          <div key={idx}>
            <List
              className="songlist"
              style={{
                display: "flex",
                alignItems: "flexStart",
                position: "relative",
                flexDirection: "column",
                boxSizing: "borderBox",
                textAlign: "left",
                justifyContents: "flexStart",
              }}
            >
              <ListItem>
                <div
                  onClick={() => {
                    setSelectedSongId(data.id);
                    console.log("click");
                  }}
                >
                  {data.title}
                </div>
                <div>{data.artist}</div>
                <audio controls src={data.preview_url}></audio>
              </ListItem>
            </List>
          </div>
        );
      })}
    </Box>
  );
}
