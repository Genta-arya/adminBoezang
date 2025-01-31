import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreatePromo } from "../../../services/Products/Promo";
import { toast, ToastContainer } from "react-toastify";
import { message } from "antd";
import { PulseLoader } from "react-spinners";
import { getSingleProduct } from "../../../services/Products/Products";

// Component to create promo for a product
const ModalPromo = ({ products, isOpen, onClose, refresh }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variants, setVariants] = useState([]);
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState(true);

  const [expiryDate, setExpiryDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const onCloseModal = () => {
    setSelectedProduct(null);
    setSelectedVariant(null);
    setDiscount("");
    setStatus(true);
    setExpiryDate(new Date());
    onClose();
  };

  // Fetch variants when a product is selected
  useEffect(() => {
    const fetchVariants = async () => {
      if (selectedProduct) {
        try {
          const response = await getSingleProduct(selectedProduct.value);
          const product = response.data;
          setVariants(
            product.variants.map((variant, index) => ({
              value: variant.externalId,
              label: `${variant.kapasitas}GB -  Variant ${index + 1}`,
            }))
          );
        } catch (error) {
          console.error("Failed to fetch variants:", error);
        }
      } else {
        setVariants([]);
        setSelectedVariant(null);
      }
    };

    fetchVariants();
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || !selectedVariant || !discount || !expiryDate) {
      message.info("Please fill out all fields.");
      return;
    }

    const discountValue = parseInt(discount);
    if (discountValue < 1 || discountValue > 100) {
      message.info("Maksimal Diskon 100%");
      return;
    }

    const now = new Date();
    if (expiryDate <= now) {
      message.info("Diskon harus berlaku setelah tanggal sekarang");
      return;
    }

    try {
      setLoading(true);
      await CreatePromo({
        variantId: selectedVariant.value,
        discount: discountValue,
        expiryDate: expiryDate.toISOString(),
      });

      toast.success("Promo created successfully!");
      refresh();
      onClose();
    } catch (error) {
      if (error.response.status === 400) {
        return message.info(error.response.data.message);
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Convert products data to options for the Select component
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="lg:w-[50%] md:w-[70%] mx-auto p-6 bg-white shadow-lg rounded-lg z-50 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Create Promo</h1>
          <button
            onClick={() => onCloseModal()}
            className="text-gray-600 hover:text-gray-800 absolute top-2 right-2"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="font-medium mb-1">Product:</label>
            <Select
              options={productOptions}
              value={selectedProduct}
              onChange={setSelectedProduct}
              placeholder="Select a product"
            />
          </div>

          {selectedProduct && (
            <>
              <div className="flex flex-col mb-4">
                <label className="font-medium mb-1">Variant:</label>
                <Select
                  options={variants}
                  required
                  value={selectedVariant}
                  onChange={setSelectedVariant}
                  placeholder="Pilih Variant"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-medium mb-1">Discount:</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Besar Discount"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-medium mb-1">Berakhir:</label>
                <DatePicker
                  selected={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onCloseModal}
              className="border w-full text-black border-black py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black w-full text-white py-2 px-4 rounded-md hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? <PulseLoader size={8} color="#ffffff" /> : "Submit"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ModalPromo;
