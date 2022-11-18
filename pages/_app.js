import { RecoilRoot } from "recoil";
import "../styles/global.css";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
