import React from "react";
import icon from "../../../assets/alert.png";
import { DeleteSingleProduct } from "../../../services/Products/Products";
import { toast, ToastContainer } from "react-toastify";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import useProductStore from "../../../Zustand/useProductStore";
import { message } from "antd";

const ModalConfirmDelete = ({ id, onClose, refresh, isOpen }) => {
  const { setLoading, isLoading } = useLoadingStores();

  console.log(isOpen);

  const handleSubmit = async () => {
    console.log("click");
    setLoading(true);
    try {
      await DeleteSingleProduct(id);

      refresh();
      onClose(false);
      message.success("Produk telah dihapus")
      
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menghapus data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="flex justify-center">
        <img src={icon} alt=""></img>
      </div>

      <h1 className="font-bold text-lg text-center">
        Apa anda yakin ingin menghapus data ini?
      </h1>

      <div className="flex flex-col gap-2 font-bold mt-12">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-black rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-500 text-white py-2 px-4"
        >
          Lanjutkan
        </button>
      </div>

    </div>
  );
};

export default ModalConfirmDelete;
