import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContentAdmin from "./components/ContentAdmin";

import LoadingLottie from "./components/Loading";
import useLoadingStores from "./Zustand/useLoadingStore";

const App = () => {
  return (
    <>
      <div className="md:hidden lg:hidden h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-sm font-bold text-center ">
          System Admin Tidak Support Versi Mobile
        </h1>
      </div>
      <main className="flex flex-col h-screen">
        <div className="     hidden md:block lg:block">
          <div className="flex flex-1">
            <div className="relative flex-shrink-0">
              <Sidebar />
            </div>
            <div className="flex-1 lg:ml-52 md:ml-[204px]">
              <Navbar />
              <ContentAdmin />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
