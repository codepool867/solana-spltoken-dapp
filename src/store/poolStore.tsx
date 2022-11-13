import axios from "axios";
import { configure, makeAutoObservable } from "mobx";
import type { PoolProps } from "utils";
// configure({
//   enforceActions: "never",
// });

class PoolStore {
  pools: PoolProps[] = [];
  poolPageNumber: number = 1;
  hasMore: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.getPoolsFromApi(1);
  }
  resetPools = () => {
    // this.poolPageNumber = this.poolPageNumber + 1;
    this.getPoolsFromApi(this.poolPageNumber);
  };
  getPoolsFromApi = async (pageNumber: number) => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/pools",
        params: { page: pageNumber },
      });
      if (res.data.length === 0) {
        this.hasMore = false;
      } else {
        this.pools = [...this.pools, ...res.data];
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
  };
}

const poolStore = new PoolStore();
export default poolStore;
