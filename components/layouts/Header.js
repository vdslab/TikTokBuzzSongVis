import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchPopup from "../views/SearchPopup";

export default function Header() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  function handleClose() {
    setIsOpenPopup(false);
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              header title
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                setIsOpenPopup(true);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <SearchPopup isOpen={isOpenPopup} handleClose={handleClose} />
    </div>
  );
}
