import { RecoilRoot } from "recoil";
import "../styles/global.css";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";

export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <RecoilRoot>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
