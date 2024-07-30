import React, { useState } from "react";
import { EditTitle } from "../../../services/Browsur/BrowsurService";
import { message } from "antd";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import LoadingLottie from "../../../components/Loading";

const ModalEditTitle = ({ onClose, isOpen, data, refresh }) => {
  const [title, setTitle] = useState(data.title);
  const { isLoading, setLoading } = useLoadingStores();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await EditTitle({ title, id: data.id });
      refresh();
      onClose();
      message.success("Pop Up Berhasil diupdate");
    } catch (error) {
      if (error.response.status === 400) {
        message.error("Pop Up gagal diupdate");
      } else if (error.response.status === 500) {
        message.error("Terjadi kesalahan pada server");
      
        localStorage.removeItem("_token");
      }
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) return <LoadingLottie />;
  return (
    <div>
      {" "}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Pop Up</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Nama Pop up
                </label>
                <input
                  type="text"
                  placeholder="Nama Pop up"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end flex-col-reverse gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-opacity-85 transition-all text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black  hover:opacity-90 transition-all text-white font-bold py-2 px-4 rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalEditTitle;
