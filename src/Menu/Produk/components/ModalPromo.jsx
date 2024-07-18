import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreatePromo } from "../../../services/Products/Promo";
import { toast, ToastContainer } from "react-toastify";

const ModalPromo = ({ products, isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discount, setDiscount] = useState("");
  const [expiresAt, setExpiresAt] = useState(null); // State for expiration date

  const handleProductChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleSave = async () => {
    try {
      const productIds = selectedProducts.map((product) => product.value);
      const promoData = {
        discount: parseFloat(discount), // Convert discount to float if needed
        productIds,
        expiresAt: expiresAt.toISOString(), // Convert date to ISO string format
      };

      // Call backend service to create promo
      const response = await CreatePromo(promoData);
      console.log("Promo created:", response);

      // Optionally, close the modal or handle success feedback
      onClose();
    } catch (error) {
      if (error.response.status === 400) {
        toast.info(error.response.data.message);
      }
      console.error("Error creating promo:", error);
      // Handle error, display message, etc.
    }
  };

  if (!isOpen) return null;

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <form
        onSubmit={handleSave}
        className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Tambah Promo</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pilih Produk</label>
          <Select
            isMulti
            options={productOptions}
            required
            className="w-full"
            onChange={handleProductChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Diskon (%)</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
            value={discount}
            onChange={handleDiscountChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tanggal Berakhir</label>
          <div className="w-full flex justify-center">
            <DatePicker
              selected={expiresAt}
              onChange={(date) => setExpiresAt(date)}
              className="w-full px-3 py-2 border border-gray-500 rounded-lg"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div className="flex justify-end flex-col-reverse gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg "
          >
            Batal
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Simpan
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModalPromo;
