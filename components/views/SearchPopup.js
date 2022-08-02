import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import SearchSongs from "./SearchSongs";

export default function SearchPopup(props) {
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
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
            曲名を検索
          </DialogTitle>
          <DialogActions>
            <IconButton
              onClick={props.handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseOutlined />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>
          <SearchSongs clickAndClose={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
