import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import AOS from "aos";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
const Layout = dynamic(import("layouts"));
const Loading = dynamic(import("components/Loading"));
const MainActionProvider = dynamic(import("contexts/MainActionContext"));
const PoolDetailProvider = dynamic(import("contexts/PoolDetailContext"));
const SDKInitProvider = dynamic(import("contexts/SDKInitContext"));
const TokenInfoProvider = dynamic(import("contexts/TokenInfoContext"));
const WalletConnectProvider = dynamic(import("contexts/WalletConnectContext"));

import "aos/dist/aos.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "assets/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  NProgress.configure({ showSpinner: true });

  useEffect(() => {
    AOS.init({ duration: 2000, offset: 200 });
    // disable: window.innerWidth < 834
    // AOS.refresh();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteFinish);
    router.events.on("routeChangeError", handleRouteFinish);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteFinish);
      router.events.off("routeChangeError", handleRouteFinish);
    };
  }, [router.events]);

  const handleRouteStart = () => NProgress.start();
  const handleRouteFinish = () => NProgress.done();

  return (
    <MainActionProvider>
      <WalletConnectProvider>
        <SDKInitProvider>
          <TokenInfoProvider>
            <PoolDetailProvider>
              <Loading />
              <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PoolDetailProvider>
          </TokenInfoProvider>
        </SDKInitProvider>
      </WalletConnectProvider>
    </MainActionProvider>
  );
};

export default MyApp;
