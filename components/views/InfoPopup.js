import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { getScoreIcon } from "./SongListCard";
import Box from "@mui/material/Box";
import style from "./InfoPopup.module.css";
import { Paper } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function InfoPopup(props) {
  return (
    <BootstrapDialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleClose}
      >
        BuzzLeadへようこそ
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: 1 }}>
          <div className={style.subtitle}>BuzzLeadについて</div>
          <Typography gutterBottom>
            BuzzLeadは過去にTiktokで流行した曲のデータをもとに次にTikTokで流行する曲を予測するアプリケーションです。
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <div className={style.subtitle}>流行度について</div>
          <Typography gutterBottom>
            このアプリではTikTokでの流行のしやすさを流行度と呼んでいます。
            流行度は以下のアイコンで示しています。
            <div style={{ paddingTop: "1rem" }}>
              <div className={style.buzz_score_icon_wrapper}>
                <div className={style.buzz_score_txt}>低</div>
                {[0, 33, 66, 100].map((value) => {
                  return <div key={value}>{getScoreIcon(value)}</div>;
                })}
                <div className={style.buzz_score_txt}>高</div>
              </div>
            </div>
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <div className={style.subtitle}>ポジティブ度</div>
          <Typography gutterBottom>
            歌詞がどれくらいポジティブかを表します。0がネガティブ, 50がノーマル,
            100がポジティブとなります。
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <div className={style.subtitle}>韻踏み度</div>
          <Typography gutterBottom>
            歌詞がどれくらい韻を踏んでいるかを表します。値が大きいほど韻を踏んでいます。
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <div className={style.subtitle}>音楽特徴量について</div>
          <Typography gutterBottom style={{ fontWeight: "0.8rem" }}>
            音楽特徴量について このアプリではSpotify
            Analyticsで提供されている音楽特徴量をもとに流行度を算出しています。
            音楽特徴量の詳細は以下の通りです。
          </Typography>
          <Paper variant="outlined" elevation={0} sx={{ p: 2 }}>
            <div className={style.subtitle}>acousticness</div>
            <Typography gutterBottom>
              0.0から1.0までの値で、曲がアコースティックかどうかを示す。
              1.0は曲がアコースティックであるという評価が高いことを表す。
            </Typography>
            <div className={style.subtitle}>danceability</div>
            <Typography gutterBottom>
              テンポ、リズムの安定性、ビートの強さ、全体的な規則性などの音楽要素の組み合わせに基づき、
              曲がダンスにどの程度適しているかを示す。0.0は最も踊りやすくなく、1.0は最も踊りやすい。
            </Typography>
            <div className={style.subtitle}>energy</div>
            <Typography gutterBottom>
              激しさと活発さを知覚できる程度の数字で表し、0.0から1.0までの値で計測する。
              通常、エネルギッシュな曲は早く、大きく、ノイズが多いと感じる。
            </Typography>
            <div className={style.subtitle}>instrumentalness</div>
            <Typography gutterBottom>
              曲にボーカルが含まれていないかどうかを予測する。
              なお、「Ooh」と「aah」の音は楽器として取り扱う。ラップやスポークンワード（喋り言葉）の曲は
              明らかに「ボーカル」である。
              値が1.0に近いほど、曲にボーカルコンテンツが含まれていない可能性が高い。
            </Typography>
            <div className={style.subtitle}>liveness</div>
            <Typography gutterBottom>
              レコードのなかに聴衆の存在がどれくらいあるのかを検出する。値が高いほど、その曲がライブで演奏された可能性が高い。
              値が0.8を超す場合は、その曲がライブ（生演奏）である可能性が高いことを示す。
            </Typography>
            <div className={style.subtitle}>loudness</div>
            <Typography gutterBottom>
              音の強さ・大きさ、曲の全体の音の強さ・大きさを示すデシベル数（dB）。
            </Typography>
            {/* <div className={style.subtitle}>mode</div>
            <Typography gutterBottom>
              モードは曲の様式（長調または短調）、すなわち旋律の音階を示す。長調は１で示され、短調は０で示される。
            </Typography> */}
            <div className={style.subtitle}>speechiness</div>
            <Typography gutterBottom>
              その曲のなかにある話し言葉の存在を検出する。ただのスピーチ
              （トークショー、オーディオブック、詩等）に似ているような録音であるほど、値は
              1.0 に近づく。
              0.66を超える値は、完全に話し言葉でできている曲であろうことを示す。
              0.33から0.66までの値は、セクションまたはレイヤーのいずれかで音楽とスピーチの両方を含む
              可能性のある曲（ラップ音楽等の場合も含む）を表す。
              0.33未満の値であれば、その曲はほとんど音楽であり、言葉が含まれていないことの可能性が高くなる。
            </Typography>
            <div className={style.subtitle}>tempo</div>
            <Typography gutterBottom>
              曲全体で見込まれる毎分時のビート（BPM）。
            </Typography>
            <div className={style.subtitle}>time_signature</div>
            <Typography gutterBottom>曲の長さを示す。</Typography>
            <div className={style.subtitle}>valence</div>
            <Typography gutterBottom>
              0.0から1.0までの値を用いてその曲の音楽的なポジティブさ（陽気さ）を示す。
              高いほど曲はよりポジティブに聞こえ（例：幸せ、陽気、陶酔）、
              低いほどよりネガティブに聞こえる（例：悲しい、落ち込んだ、怒っている）。
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ p: 1 }}>
          <div className={style.subtitle}>データについて</div>
          <Typography gutterBottom>
            以下のサイトのデータをもとに流行度の算出をしています。
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="https://www.billboard-japan.com/charts/detail?a=tiktok"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok Weekly Top 20 | Charts - Billboard JAPAN
            </a>
            <a
              href="https://charts.spotify.com/charts/view/regional-jp-weekly/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify Chart Weekly Top Songs Japan
            </a>
            <a
              href="https://developer.spotify.com/documentation/web-api/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify API
            </a>
          </div>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
