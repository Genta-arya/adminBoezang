import React from "react";
import icon from "../../../assets/alert.png";
import { DeleteSingleProduct } from "../../../services/Products/Products";
import { toast, ToastContainer } from "react-toastify";

const ModalConfirmDelete = ({ id, onClose, refresh }) => {

  const handleSubmit = async () => {
    console.log("click")
    try {

      const response = await DeleteSingleProduct(id);
    
        toast.success("Produk Berhasil di Hapus", {
          onClose: () => {
            onClose(false);
            refresh();
          },
        });
      
    } catch (error) {
      console.log(error);
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
          className="bg-black text-white py-2 px-4"
        >
          Lanjutkan
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalConfirmDelete;
