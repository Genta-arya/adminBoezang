import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ModalContainer from "../../../components/ModalContainer";
import ModalProduct from "./ModalProduct";
import useSearchStore from "../../../Zustand/useSearchStore";

const HeaderProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="flex justify-between items-center p-4 bg-gray-200 shadow-md text-black rounded-lg">
        <button
          onClick={openModal}
          className="bg-black hover:scale-95 ease-in transition-all text-white flex items-center px-4 py-2 rounded hover:bg-gray-900 focus:outline-none"
        >
          <FaPlus className="mr-2" />
          Tambah Produk
        </button>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari produk..."
            className="bg-black border border-gray-700 rounded-lg py-2 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <ModalContainer
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={"Tambah Produk"}
      >
        <ModalProduct />
      </ModalContainer>
    </div>
  );
};

export default HeaderProduct;
