import React, { useState, useEffect } from "react";
import HeaderProduct from "./HeaderProduct";
import { getProduct } from "../../../services/Products/Products";
import { formatPrice } from "../../../Utils";
import ModalContainer from "../../../components/ModalContainer";
import ModalEditProduct from "./ModalEditProduct";
import useSearchStore from "../../../Zustand/useSearchStore";
import useGetProducts from "../../../Hooks/Products/useGetProducts";
import LoadingLottie from "../../../components/Loading";
import useLoadingStores from "../../../Zustand/useLoadingStore";

const ListProduct = () => {
  const {isLoading} = useLoadingStores()
  const {
    fetchProducts,
    filteredProducts,
    handleOpenModal,
    isModalOpen,
    selectedData,
    setIsModalOpen,

  } = useGetProducts();

  if (isLoading)
    return (
      <>
        <LoadingLottie />
      </>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border rounded-lg shadow-md overflow-hidden group"
          >
            <div className="relative flex justify-center">
              <img src={product.image} alt={product.name} className="w-52" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-20">
                <div className="flex space-x-4">
                  <button
                    className="bg-black w-32 text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                    onClick={() => handleOpenModal(product)}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 w-32 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

              <p className="text-blue-600 font-bold">
                {formatPrice(product.price)}
              </p>

              {product.capacities.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-md font-semibold">Penyimpanan</h4>
                  <ul className="list-disc list-inside">
                    {product.capacities.map((capacity) => (
                      <li key={capacity.id} className="text-gray-700">
                        {capacity.value} GB
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.colors.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-md font-semibold mb-2">Warna</h4>
                  <ul className="list-disc list-inside bg-gray-300  w-fit py-1 flex flex-wrap  px-4 rounded-lg ">
                    {product.colors.map((color) => (
                      <li
                        key={color.id}
                        className="text-gray-700 flex items-center p-1 gap-4 justify-center"
                      >
                        <span
                          style={{ backgroundColor: color.value }}
                          className="inline-block w-4 h-4 rounded-full "
                        ></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ModalContainer
        isOpen={isModalOpen}
        closeModal={setIsModalOpen}
        title={"Edit Produk"}
      >
        <ModalEditProduct
          product={selectedData}
          onClose={setIsModalOpen}
          refresh={fetchProducts}
        />
      </ModalContainer>
    </div>
  );
};

export default ListProduct;
