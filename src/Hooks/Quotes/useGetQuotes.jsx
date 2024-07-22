import React, { useEffect, useState } from "react";
import { getQuotest } from "../../services/Quotest/ApiQuotest";
import useLoadingStores from "../../Zustand/useLoadingStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useGetQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useLoadingStores();
  const fetchQuotest = async () => {
    setLoading(true);
    try {
      const response = await getQuotest({ cacheBuster: new Date().getTime() });
      setQuotes(response.data.reverse());
    } catch (error) {
      message.error("Terjadi Masalah Pada server");
      localStorage.removeItem("_token");
      navigate("/login");
      if (error.response.status === 404) {
        localStorage.removeItem("_token");
        navigate("/login");
      }

      if (error.request) {
        message.error(
          "IP telah diblok sementara karena terlalu banyak melakukan request, silahkan coba beberapa saat lagi"
        );
      } else {
        localStorage.removeItem("_token");
        navigate("/login");
        message.error(error.response?.data?.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotest();
  }, []);

  return {
    quotes,
    setQuotes,
    fetchQuotest,
  };
};

export default useGetQuotes;
