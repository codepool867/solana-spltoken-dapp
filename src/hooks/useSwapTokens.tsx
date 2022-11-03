import axios from "axios";
import { useMainAction } from "contexts";
import React, { useEffect, useState } from "react";
import type { PairProps } from "utils";
export default function useSwapTokens(pageNumber: number) {
  const { isActionLoading, setIsActionLoading } = useMainAction();

  const [hasMore, setHasMore] = useState(true);
  const [tokens, setTokens] = useState<PairProps[]>([]);

  useEffect(() => {
    setIsActionLoading(true);
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
      setIsActionLoading(false);
    });
  }, [pageNumber]);

  return { loading, tokens, hasMore };
}
