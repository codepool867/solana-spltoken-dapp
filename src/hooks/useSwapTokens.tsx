import axios from "axios";
import React, { useEffect, useState } from "react";
import type { PairProps } from "utils";
export default function useSwapTokens(pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tokens, setTokens] = useState<PairProps[]>([]);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "/api/swapToken",
      params: { page: pageNumber },
    }).then((res) => {
      if (res.data.length === 0) {
        setHasMore(false);
      }
      setTokens((prevTokens) => {
        if (pageNumber === 1) return res.data;
        return [...prevTokens, ...res.data];
      });
      setLoading(false);
    });
  }, [pageNumber]);

  return { loading, tokens, hasMore };
}
