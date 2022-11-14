import { makeAutoObservable, values } from "mobx";
class MainActionStore {
  isActionLoading: boolean = false;
  setIsActionLoading = async (isActionLoading: boolean) => {
    this.isActionLoading = isActionLoading;
  };
  index: number = -1;
  setIndex = (value: number) => {
    this.index = value;
  };
  showModal: boolean | string = false;
  setShowModal = (value: boolean | string) => {
    this.showModal = value;
  };
  isTXLoading: boolean = false;
  setIsTXLoading = (value: boolean) => {
    this.isTXLoading = value;
  };
  constructor() {
    makeAutoObservable(this);
  }
}

const mainActionStore = new MainActionStore();
export default mainActionStore;
