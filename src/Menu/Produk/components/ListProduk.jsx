import React, { useEffect, useState } from "react";
import {
  DeleteSingleProduct,
  getProduct,
} from "../../../services/Products/Products";
import HeaderProduct from "./HeaderProduct";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProduk from "../Modal/EditProduk";
import useSearchStore from "../../../Zustand/useSearchStore";
import NotFoundProduk from "./NotFoundProduk";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import LoadingLottie from "../../../components/Loading";
import { formatDate, formatPrice } from "../../../Utils";
import { StopPromo } from "../../../services/Products/Promo";
import { message } from "antd";

const ListProduk = () => {
  const [products, setProducts] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const { searchTerm } = useSearchStore();
  const { isLoading, setLoading } = useLoadingStores();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    setOpenEditModal(true);
    setSelectData(productId);
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    try {
      await DeleteSingleProduct(productId);
      message.success("Produk telah dihapus");
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopPromo = async (promoId) => {
    setLoading(true);

    try {
      await StopPromo(promoId);
      message.success("Promo telah dihentikan");
      fetchProducts();
    } catch (error) {
      console.error("Failed to stop promo:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingLottie />;
  }

  return (
    <>
      <HeaderProduct fetchProducts={fetchProducts} products={products} />

      <div className="text-black min-h-screen p-6">
        {filteredProducts.length < 1 ? (
          <NotFoundProduk />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative text-black rounded-lg shadow-lg overflow-hidden group"
                >
                  <div className="relative flex justify-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-52"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="text-white p-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-white p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <div
                        className={`w-4 h-4 rounded-full ${
                          product.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Type: {product.category}
                    </p>

                    <div className="space-y-2">
                      {product.variants.map((variant, index) => {
                        const originalPrice = variant.price;
                        const discountedPrice =
                          originalPrice -
                          originalPrice *
                            (parseFloat(variant.promo?.discount) / 100);

                        // Calculate discount percentage
                        const discountPercentage =
                          variant.promo && variant.promo.status
                            ? parseFloat(variant.promo.discount)
                            : 0;

                        const expiredDate = new Date(variant.promo?.expiryDate);

                        return (
                          <div
                            key={variant.id}
                            className="border-t border-gray-300 pt-2"
                          >
                            <div className="flex justify-between items-center">
                              <strong>Variant {index + 1}</strong>
                              <p className={`text-white font-bold px-4 rounded-md ${variant.quality === true ? "bg-red-500" : "bg-green-500"}`}>
                                {variant.quality === true ? "New" : "Second"}
                              </p>
                            </div>
                            {product.category === "iphone" && (
                              <p>{variant.kapasitas} GB</p>
                            )}

                            {variant.promo && variant.promo.status ? (
                              <>
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                  <div className="">
                                    <p className="text-gray-500 line-through">
                                      {formatPrice(originalPrice)}
                                    </p>
                                    <div className="flex flex-col">
                                      <p className="text-red-600 font-bold">
                                        {formatPrice(discountedPrice)}{" "}
                                      </p>
                                      <div className="flex lg:flex-col md:flex-col  text-red-400 ">
                                        <span className="text-red-400">
                                          Discount {discountPercentage}%
                                        </span>
                                        <span className="">
                                          Exp {formatDate(expiredDate)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleStopPromo(variant.promo.id)
                                    }
                                    className="text-white p-2 text-xs bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors"
                                  >
                                    Matikan Promo
                                  </button>
                                </div>
                              </>
                            ) : (
                              <p className="text-black font-bold">
                                {formatPrice(originalPrice)}
                              </p>
                            )}

                            <div className="mt-4">
                              <strong>Warna</strong>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {variant.colorVariants.map((color) => (
                                  <div
                                    key={color.id}
                                    className="w-8 h-8 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor: color.value,
                                      width: "32px",
                                      height: "32px",
                                    }}
                                    title={color.value}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {openEditModal && (
        <EditProduk
          productId={selectData}
          refresh={fetchProducts}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </>
  );
};

export default ListProduk;
