import { RecoilRoot } from "recoil";
import "../styles/global.css";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <RecoilRoot>
      <Head>
        <title>BuzzLead</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="https://buzzlead.vdslab.jp/images/icon.png"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
