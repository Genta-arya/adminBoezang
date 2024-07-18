import React, { useState, useEffect } from "react";
import HeaderProduct from "./HeaderProduct";
import { getProduct } from "../../../services/Products/Products";
import { formatDate, formatPrice } from "../../../Utils";
import ModalContainer from "../../../components/ModalContainer";
import ModalEditProduct from "./ModalEditProduct";
import useSearchStore from "../../../Zustand/useSearchStore";
import useGetProducts from "../../../Hooks/Products/useGetProducts";
import LoadingLottie from "../../../components/Loading";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalPromo from "./ModalPromo"; // Assume ModalPromo is where you edit or create promos
import ModalEditPromosi from "./ModalEditPromosi";

const ListProduct = () => {
  const { isLoading } = useLoadingStores();
  const [ModalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store selected product ID for editing promos
  const {
    fetchProducts,
    filteredProducts,
    handleOpenModal,
    isModalOpen,
    selectedData,
    setIsModalOpen,
  } = useGetProducts();

  // useEffect to fetch products and promos
  useEffect(() => {
    fetchProducts(); // Call function to fetch products from backend
  }, []); // [] indicates that useEffect will be called only once when the component mounts

  const handleDelete = (data) => {
    setId(data);
    setModalDelete(true);
  };

  // Function to handle edit promo button click
  const handleEditPromo = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true); // Open modal to edit promos
  };

  // Function to calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price * ((100 - discount) / 100);
    return discountedPrice.toFixed(2); // Ensure price is formatted to two decimal places
  };

  if (isLoading) {
    return (
      <>
        <LoadingLottie />
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border rounded-lg shadow-md overflow-hidden group"
          >
            <div className="relative flex justify-center">
              <img src={product.image} alt={product.name} className="w-52 h-52 py-2" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-20">
                <div className="flex space-x-4">
                  <button
                    className="bg-black w-32 text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                    onClick={() => handleOpenModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 w-32 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <button className="bg-black text-xs font-bold text-white rounded-lg py-1 px-3">Matikan Promo</button>
                <button className="bg-black text-xs font-bold text-white rounded-lg py-1 px-3">Matikan Terlaris</button>
              </div>

              {/* Display original price and discounted price if promo available */}
              {product.promos.length > 0 ? (
                <div className="flex items-center mb-2">
                  <p className="text-gray-500 line-through">{formatPrice(product.price)}</p>
                  <p className="ml-2 text-blue-600 font-bold">
                    {formatPrice(calculateDiscountedPrice(product.price, product.promos[0].discount))}
                  </p>
                </div>
              ) : (
                <p className="text-blue-600 font-bold">
                  {formatPrice(product.price)}
                </p>
              )}

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

              {/* Display promos if available */}
              {product.promos.length > 0 && (
                <div className="mt-2 border-t mt-4">
                  <p className="font-semibold mt-4">Promo</p>
                  <ul className="list-disc list-inside">
                    {product.promos.map((promo) => (
                      <li key={promo.id} className="text-gray-700">
                        Diskon {promo.discount}% (Berakhir pada{" "}
                        {formatDate(promo.expiresAt)})
                        <button
                          className="ml-2 text-blue-600 underline"
                          onClick={() => handleEditPromo(product)}
                        >
                          Edit Promosi
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal to edit promos */}
      <ModalContainer
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={"Edit Promosi"}
      >
        <ModalEditPromosi  product={selectedProductId} onClose={() => setIsModalOpen(false)} />
      </ModalContainer>

      {/* Modal for delete confirmation */}
      <ModalContainer
        isOpen={ModalDelete}
        closeModal={() => setModalDelete(false)}
        title={"Konfirmasi"}
      >
        <ModalConfirmDelete
          id={id}
          onClose={() => setModalDelete(false)}
          refresh={fetchProducts}
        />
      </ModalContainer>
    </div>
  );
};

export default ListProduct;
