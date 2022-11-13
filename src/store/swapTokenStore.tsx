import axios from "axios";
import { configure, makeAutoObservable } from "mobx";
import type { PairProps } from "utils";
// configure({
//   enforceActions: "never",
// });

class SwapTokenStore {
  swapTokens: PairProps[] = [];
  pageNumber: number = 1;
  hasMore: boolean = true;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    // this.getTokensFromApi(1);
  }
  resetTokens = () => {
    this.pageNumber = this.pageNumber + 1;
    this.getTokensFromApi(this.pageNumber);
  };
  getTokensFromApi = async (pageNumber: number) => {
    this.isLoading = true;
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
          this.swapTokens = res.data;
        } else {
          this.swapTokens = [...this.swapTokens, ...res.data];
        }
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
    this.isLoading = false;
  };
}

const swapTokenStore = new SwapTokenStore();
export default swapTokenStore;
