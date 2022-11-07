import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchPopup from "../views/SearchPopup";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Header() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const router = useRouter();

  function handleClose() {
    setIsOpenPopup(false);
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "black" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                cursor: "pointer",
                width: "180px",
              }}
              onClick={() => router.push(`/`)}
            >
              TikTokBuzzSongVis
            </Typography>
            <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                setIsOpenPopup(true);
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => router.push(`/my_page`)}
            >
              <FavoriteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <SearchPopup isOpen={isOpenPopup} handleClose={handleClose} />
    </div>
  );
}
