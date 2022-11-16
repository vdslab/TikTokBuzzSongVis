import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchPopup from "../views/SearchPopup";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoPopup from "../views/InfoPopup";

export default function Header() {
  const [isOpenSearchPopup, setIsOpenSearchPopup] = useState(false);
  const [isOpenInfoPopup, setIsOpenInfoPopup] = useState(false);
  const router = useRouter();

  function handleSearchPopupClose() {
    setIsOpenSearchPopup(false);
  }

  function handleInfoPopupClose() {
    setIsOpenInfoPopup(false);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "black" }}>
          <Toolbar>
            <img
              src="../../images/logo.png"
              height="40px"
              alt="ロゴ"
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => router.push(`/`)}
            />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                setIsOpenInfoPopup(true);
              }}
            >
              <InfoOutlinedIcon />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                setIsOpenSearchPopup(true);
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
      <SearchPopup
        isOpen={isOpenSearchPopup}
        handleClose={handleSearchPopupClose}
      />
      <InfoPopup isOpen={isOpenInfoPopup} handleClose={handleInfoPopupClose} />
    </div>
  );
}
