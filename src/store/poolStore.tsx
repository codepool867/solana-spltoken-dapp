import axios from "axios";
import { makeAutoObservable } from "mobx";
import mainActionStore from "./mainActionStore";
import type { PoolProps } from "utils";

class PoolStore {
  pools: PoolProps[] = [];
  pageNumber: number = 1;
  hasMore: boolean = true;
  detailPoolIndex: number = 0;
  setIsLoading = (isLoading: boolean) => {
    mainActionStore.setIsActionLoading(isLoading);
  };
  setPools = (pools: PoolProps[]) => {
    this.pools = pools;
  };
  setHasMore = (hasMore: boolean) => {
    this.hasMore = hasMore;
  };
  constructor() {
    makeAutoObservable(this);
    // this.getPoolsFromApi(1);
  }
  resetPools = () => {
    this.pageNumber = this.pageNumber + 1;

    this.getPoolsFromApi(this.pageNumber);
  };
  setDetailPoolIndex = (address: string) => {
    this.pools.map((pool, index) => {
      if (address === pool.address) {
        this.detailPoolIndex = index;
        return;
      }
    });
  };
  getPoolsFromApi = async (pageNumber: number) => {
    this.setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: "/api/pools",
        params: { page: pageNumber },
      });
      if (res.data.length === 0) {
        this.setHasMore(false);
      } else {
        if (pageNumber === 1) {
          this.setPools(res.data);
        } else {
          this.setPools([...this.pools, ...res.data]);
        }
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
    this.setIsLoading(false);
  };
}

const poolStore = new PoolStore();
export default poolStore;
