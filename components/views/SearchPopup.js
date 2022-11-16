import { Dialog, DialogContent } from "@mui/material";
import SearchSongs from "./SearchSongs";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function SearchPopup(props) {
  return (
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
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>曲名 または アーティスト名で検索</div>
        <IconButton
          size="small"
          onClick={props.handleClose}
          aria-label="close"
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <SearchSongs clickAndClose={true} handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
}
