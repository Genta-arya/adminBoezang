import React, { useState } from "react";
import { FaCog, FaPlus, FaSearch, FaTags } from "react-icons/fa";

import useSearchStore from "../../../Zustand/useSearchStore";

import ModalPromo from "./ModalPromo";
import AddProduk from "../Modal/AddProduk";

const HeaderProduct = ({ products, fetchProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPromo, setIsModalOpenPromo] = useState(false);

  const { searchTerm, setSearchTerm } = useSearchStore();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalPromo = () => setIsModalOpenPromo(true);
  const closeModalPromo = () => setIsModalOpenPromo(false);

  return (
    <div className="container mx-auto lg:px-4 pt-8">
      <div className="flex justify-between lg:flex-row md:flex-col-reverse md:gap-3 items-center p-4 bg-gray-200 shadow-md text-black rounded-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={openModal}
            className="bg-black  hover:scale-95 ease-in transition-all text-white flex items-center px-4 py-2 rounded hover:bg-gray-900 focus:outline-none"
          >
            <FaPlus className="mr-2" />
            Tambah Produk
          </button>
          <button
            onClick={openModalPromo}
            className="bg-black  hover:scale-95 ease-in transition-all text-white flex items-center px-4 py-2 rounded hover:bg-gray-900 focus:outline-none"
          >
            <FaTags className="mr-2" />
            Tambah Promo
          </button>
        </div>

        <div className="relative md:w-full lg:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari produk..."
            className="bg-black border md:w-full border-gray-700 rounded-lg py-2 px-4 pl-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
      </div>
      {isModalOpen && (
        <AddProduk onClose={closeModal} refresh={fetchProducts} />
      )}

      <ModalPromo
        products={products}
        isOpen={isModalOpenPromo}
        onClose={closeModalPromo}
        refresh={fetchProducts}
      />
    </div>
  );
};

export default HeaderProduct;
