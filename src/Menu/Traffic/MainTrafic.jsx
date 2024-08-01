import React, { useEffect, useState } from "react";
import HeaderTrafic from "./components/HeaderTrafic";
import TrafficChart from "./TrafficChart";
import { io } from "socket.io-client";
import DetailVisit from "./components/DetailVisit";
import { motion, useAnimation } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const MainTrafic = () => {
  const [visitorsData, setVisitorsData] = useState([]);
  const [showScroll, setShowScroll] = useState(false); // State untuk kontrol visibilitas tombol scroll
  const controls = useAnimation(); // Menggunakan animasi kontrol

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

  // Mengatur scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Tampilkan tombol jika scroll lebih dari 50px
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Mengontrol animasi saat tombol muncul
  useEffect(() => {
    if (showScroll) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [showScroll, controls]);

  return (
    <div className="lg:px-2 flex flex-col gap-8">
      <Helmet>
        <title>Tracking View - Boezang Apple</title>
      </Helmet>
      <HeaderTrafic />
      <TrafficChart visitorsData={visitorsData} />
      <div>
        <DetailVisit data={visitorsData} />
      </div>

      {/* Floating Button untuk Scroll to Top */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          className="fixed z-50 bottom-5 right-8 bg-black text-white rounded-full p-3 shadow-lg hover:opacity-50 transition"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.3 }}
        >
          <FaChevronUp />
        </motion.button>
      )}
    </div>
  );
};

export default MainTrafic;
