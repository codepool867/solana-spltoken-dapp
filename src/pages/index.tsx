import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/") {
      router.push("/swap");
    }
  }, [router]);

  return <></>;
};

export default Home;
