import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContentAdmin from "./components/ContentAdmin";

const App = () => {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="relative flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 ml-52">
          <Navbar />
          <ContentAdmin />
        </div>
      </div>
    </main>
  );
};

export default App;
