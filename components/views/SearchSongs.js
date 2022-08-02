import { InputBase, Paper, IconButton } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";

export default function SearchSongs({ feature }) {
  const [inputSongName, setInputSongName] = useState("");
  const inputEl = useRef("");

  function changeInputSongName() {
    setInputSongName(inputEl.current.value);
  }

  useEffect(() => {
    (async () => {
      if (inputSongName !== "") {
        const dateRes = await fetch("/api/search_songs", {
          method: "POST",
          // TODO:ここの引数のdateをユーザーが変更できるように
          body: JSON.stringify(inputSongName),
        });
        const data = await dateRes.json();
        //TODO:続きここから
        console.log(data);
      }
    })();
  }, [inputSongName]);

  console.log(inputSongName);

  return (
    <div>
      <div>
        <Paper
          variant="outlined"
          sx={{
            p: "4px 4px",
            display: "flex",
            alignItems: "center",
            overflowY: "clip",
          }}
        >
          <InputBase
            placeholder="曲名を検索"
            inputProps={{ "aria-label": "SchoolName" }}
            inputRef={inputEl}
            fullWidth={true}
            onChange={(e) => {
              if (e.target.value === "") {
                setInputSongName("");
              }
            }}
            sx={{ m: 1 }}
          />
          <IconButton
            type="text"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={changeInputSongName}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
