import { makeAutoObservable } from "mobx";
class MainActionStore {
  isActionLoading: boolean = false;
  setIsActionLoading = async (isActionLoading: boolean) => {
    this.isActionLoading = isActionLoading;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

const mainActionStore = new MainActionStore();
export default mainActionStore;
