import React, { useState } from "react";
import { editSingleImage } from "../../../services/Browsur/BrowsurService";
import { message } from "antd";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import LoadingLottie from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { UploadImage } from "../../../services/Upload/UploadImage";

const ModalEditSingleImage = ({ onClose, isOpen, data, refresh }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { isLoading, setLoading } = useLoadingStores();
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (selectedFile) {
      try {
        const response = await UploadImage(selectedFile);
        console.log(response.status);
        // ambil status code nya
        if (response.file_url) {
          await editSingleImage(data.browsurId, data.id, response.file_url);
          refresh();
          onClose();
          message.success("Gambar Pop Up berhasil diupdate");
        } else {
          message.error("Gagal upload gambar");
        }
      } catch (error) {
        if (error.response.status === 400) {
          message.error("Gambar Pop Up gagal diupdate");
        }
        if (error.response.status === 500) {
          message.error("Terjadi kesalahan pada server");
          navigate("/login");
          localStorage.removeItem("_token");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null; // Don't render anything if not open
  if (isLoading) return <LoadingLottie />;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-[50%]">
        <h2 className="text-lg font-semibold mb-4">Edit Gambar</h2>
        <div className="flex justify-center">
          <img
            src={data.url}
            alt="Current Browsur"
            className="mb-4 w-32 rounded-md"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mb-4"
          />
          <div className="flex flex-col-reverse gap-2">
            <button
              type="button"
              onClick={onClose}
              className=" bg-gray-300 text-black py-1 px-3 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white py-1 px-3 rounded"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditSingleImage;
