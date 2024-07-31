import React, { useEffect, useState } from "react";
import HeaderTrafic from "./components/HeaderTrafic";
import TrafficChart from "./TrafficChart";
import { io } from "socket.io-client";
import DetailVisit from "./components/DetailVisit";

const MainTrafic = () => {
  const [visitorsData, setVisitorsData] = useState([]);
  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_NODE_ENV === "production"
        ? import.meta.env.VITE_IO
        : import.meta.env.VITE_IO_local
    );

    socket.on("update-visitors", (data) => {
  
      setVisitorsData(data.data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="lg:px-2 flex flex-col gap-8">
      <HeaderTrafic />
      <TrafficChart visitorsData={visitorsData} />

      <div>
        <DetailVisit data={visitorsData} />
      </div>
    </div>
  );
};

export default MainTrafic;
