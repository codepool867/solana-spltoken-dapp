import axios from "axios";
import { configure, makeAutoObservable } from "mobx";
import mainActionStore from "./mainActionStore";
import type { PairProps } from "utils";
// configure({
//   enforceActions: "never",
// });

class SwapTokenStore {
  swapTokens: PairProps[] = [];
  pageNumber: number = 1;
  hasMore: boolean = true;

  setSwapTokens = (swapTokens: PairProps[]) => {
    this.swapTokens = swapTokens;
  };
  setHasMore = (hasMore: boolean) => {
    this.hasMore = hasMore;
  };
  constructor() {
    makeAutoObservable(this);
    this.getTokensFromApi(1);
  }
  resetTokens = () => {
    this.pageNumber = this.pageNumber + 1;
    this.getTokensFromApi(this.pageNumber);
  };
  getTokensFromApi = async (pageNumber: number) => {
    mainActionStore.setIsActionLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: "/api/swapToken",
        params: { page: pageNumber },
      });
      if (res.data.length === 0) {
        this.hasMore = false;
      } else {
        if (pageNumber === 1) {
          this.setSwapTokens(res.data);
        } else {
          this.setSwapTokens([...this.swapTokens, ...res.data]);
        }
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
    mainActionStore.setIsActionLoading(false);
  };
}

const swapTokenStore = new SwapTokenStore();
export default swapTokenStore;
