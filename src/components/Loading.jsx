import React, { useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation/loading.json";
import { Helmet } from "react-helmet-async";

const LoadingLottie = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <Helmet>
        <title>Memuat Data... - Boezang Apple</title>
      </Helmet>
      <div className="w-40 h-64">
        <Lottie animationData={animationData} autoplay loop />
      </div>
    </div>
  );
};

export default LoadingLottie;
