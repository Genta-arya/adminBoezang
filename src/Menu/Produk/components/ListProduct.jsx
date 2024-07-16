import React, { useState, useEffect } from "react";
import HeaderProduct from "./HeaderProduct";
import { getProduct } from "../../../services/Products/Products";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
      }
    };

    fetchProducts();
  }, []);

  // Function to format price to IDR without decimal places
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border rounded-lg shadow-md overflow-hidden group"
          >
            <div className="relative flex justify-center">
              <img src={product.image} alt={product.name} className="w-52" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-50">
                <div className="flex space-x-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
              {/* Conditionally render capacities if not empty */}
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

              {/* Conditionally render colors if not empty */}
              {product.colors.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-md font-semibold">Warna</h4>
                  <ul className="list-disc list-inside">
                    {product.colors.map((color) => (
                      <li key={color.id} className="text-gray-700">
                        {color.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
