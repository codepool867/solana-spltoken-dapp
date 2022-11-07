import axios from "axios";
import { useMainAction } from "contexts/MainActionContext";
import React, { useEffect, useState } from "react";
import type { PoolProps } from "utils";
export default function usePools(pageNumber: number) {
  const { setIsActionLoading } = useMainAction();
  const [pools, setPools] = useState<PoolProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setIsActionLoading(true);
    axios({
      method: "GET",
      url: "/api/pools",
      params: { page: pageNumber },
    }).then((res) => {
      if (res.data.length === 0) {
        setHasMore(false);
      }
      setPools((prevPools) => {
        if (pageNumber === 1) return res.data;
        return [...prevPools, ...res.data];
      });
      setIsActionLoading(false);
    });
  }, [pageNumber]);

  return { pools, hasMore };
}
