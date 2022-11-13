import React from "react";
import { MoonLoader } from "react-spinners";
import { observer } from "mobx-react-lite";
import mainActionStore from "store/mainActionStore";
import { useMainAction } from "contexts";

const Loading = () => {
  const { isTXLoading } = useMainAction();
  return isTXLoading || mainActionStore.isActionLoading ? (
    <div className="fixed inset-0 w-full h-screen z-[9999] overflow-hidden bg-black bg-opacity-50">
      <div className="relative flex justify-center items-center h-screen">
        <MoonLoader color="white" />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default observer(Loading);
