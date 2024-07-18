import React, { useEffect, useState } from "react";
import useSearchStore from "../../Zustand/useSearchStore";
import { getProduct } from "../../services/Products/Products";
import useLoadingStores from "../../Zustand/useLoadingStore";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelecteData] = useState([]);
  const { searchTerm } = useSearchStore();
  const openModal = () => setIsModalOpen(true);
  const { isLoading, setLoading } = useLoadingStores();

  console.log(isLoading);

  const handleOpenModal = (data) => {
    openModal();
    setSelecteData(data);
  };

  const fetchProducts = async () => {

    try {
      const response = await getProduct();
      if (response.status === "success") {
        setProducts(response.data);
      } else {
        console.error("Error fetching products:", response.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    setLoading(true);
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
