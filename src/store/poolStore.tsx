import axios from "axios";
import { configure, makeAutoObservable } from "mobx";
import type { PoolProps } from "utils";
// configure({
//   enforceActions: "never",
// });

class PoolStore {
  pools: PoolProps[] = [];
  pageNumber: number = 1;
  hasMore: boolean = true;

  constructor() {
    makeAutoObservable(this);
    // this.getPoolsFromApi(1);
  }
  resetPools = () => {
    this.pageNumber = this.pageNumber + 1;
    this.getPoolsFromApi(this.pageNumber);
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
        if (pageNumber === 1) {
          this.pools = res.data;
        } else {
          this.pools = [...this.pools, ...res.data];
        }
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
  };
}

const poolStore = new PoolStore();
export default poolStore;
