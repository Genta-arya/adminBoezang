import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalEditPromosi = ({ product, onClose, refresh }) => {
  const { name } = product;
  const [promos, setPromos] = useState(product.promos);

  const handlePromoChange = (promoIndex, field, value) => {
    const updatedPromos = [...promos];
    updatedPromos[promoIndex] = {
      ...updatedPromos[promoIndex],
      [field]: value,
    };
    setPromos(updatedPromos);
  };

  const handleSave = () => {
    // Example: Call API to update the product with new promo data
    // This is a placeholder, replace with your actual API call
    // updateProduct(updatedProduct).then(() => {
    //   onClose(); // Close modal on success
    //   refresh(); // Refresh product data after update
    // });
    console.log("Updated Promos:", promos);
    // For demonstration purposes, calling onClose and refresh directly

  };

  return (
    <>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nama Produk:</label>
        <input
          value={name}
          disabled
          className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 w-full"
        />
      </div>
      {promos.map((promo, index) => (
        <div key={index} className="mb-4 ">
          <label className="block mb-1 font-semibold">Discount (%):</label>
          <input
            type="number"
            value={promo.discount}
            onChange={(e) =>
              handlePromoChange(index, "discount", Number(e.target.value))
            }
            className="border w-full border-gray-300 px-3 py-2 rounded-md "
          />
          <div className="mt-2">
            <label className="block mb-1 mt-2 w-full font-semibold">Expires At:</label>
            <DatePicker
              selected={promo.expiresAt ? new Date(promo.expiresAt) : null}
              onChange={(date) => handlePromoChange(index, "expiresAt", date)}
              dateFormat="dd-MM-yyyy"
              className="border border-gray-300  px-3 py-2 rounded-md w-auto"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center flex-col-reverse gap-2 mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ModalEditPromosi;
