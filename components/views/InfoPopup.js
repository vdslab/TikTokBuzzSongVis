import {
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import SearchSongs from "./SearchSongs";

export default function InfoPopup(props) {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"lg"}
        PaperProps={{
          style: {
            height: "70vh",
            padding: "20px",
          },
        }}
      >
        音楽特徴量 バズり度
      </Dialog>
    </div>
  );
}
