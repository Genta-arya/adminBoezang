import React, { useEffect, useState } from "react";
import useSearchStore from "../../Zustand/useSearchStore";
import { getProduct } from "../../services/Products/Products";
import useLoadingStores from "../../Zustand/useLoadingStore";
import useProductStore from "../../Zustand/useProductStore";
import { toast } from "react-toastify";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useGetProducts = () => {
  const { products, setProducts } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelecteData] = useState([]);
  const { searchTerm } = useSearchStore();
  const openModal = () => setIsModalOpen(true);
  const { isLoading, setLoading } = useLoadingStores();
  const navigate = useNavigate()
  const handleOpenModal = (data) => {
    openModal();
    setSelecteData(data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProduct();

      setProducts(response.data);
    } catch (error) {
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
      toast.info("Terjadi Masalah Pada server");
      localStorage.removeItem("_token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    products,
    isModalOpen,
    selectedData,
    filteredProducts,
    setIsModalOpen,
    handleOpenModal,
    fetchProducts,
  };
};

export default useGetProducts;
