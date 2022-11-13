import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Grid,
  Typography,
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
            padding: "20px",
          },
        }}
      >
        <Grid container>
          <Grid item xs={10} md={10}>
            <Typography style={{ fontWeight: "bolder" }}>
              曲名 または アーティスト名で検索
            </Typography>
          </Grid>
          <Grid xs={2} md={2}>
            <DialogActions>
              <IconButton
                size="small"
                onClick={props.handleClose}
                aria-label="close"
                sx={{
                  position: "absolute",
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseOutlined />
              </IconButton>
            </DialogActions>
          </Grid>
        </Grid>
        <DialogContent
          style={{
            paddingTop: "12px",
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingBottom: "0px",
          }}
        >
          <SearchSongs clickAndClose={true} handleClose={props.handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
