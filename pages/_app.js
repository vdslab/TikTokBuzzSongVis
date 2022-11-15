import { RecoilRoot } from "recoil";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
