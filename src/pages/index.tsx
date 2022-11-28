import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { default_link } from "utils";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/") {
      router.push(default_link);
    }
  }, [router]);

  return <></>;
};

export default Home;
