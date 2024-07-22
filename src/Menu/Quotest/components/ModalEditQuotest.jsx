import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditQuotest } from "../../../services/Quotest/ApiQuotest";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import { PulseLoader } from "react-spinners";

const ModalEditQuotest = ({ isOpen, onClose, quote, refresh }) => {
  const [content, setContent] = useState(quote.content);
  const [author, setAuthor] = useState(quote.author);
  const [status, setStatus] = useState(quote.status);
  const {isLoading,setLoading} = useLoadingStores()
 const navigate = useNavigate()
  const handleSave = async (event) => {
    event.preventDefault();

    const quoteData = { content, author, status };

    if (!content || !author) {
      toast.error("Both content and author are required");
      return;
    }
    try {
      setLoading(true)
      const response = await EditQuotest(quote.id, quoteData);
      message.success("Quotes Berhasil diperbarui");
      refresh();
      onClose(false);
    
    } catch (error) {
      if(error.response.status === 500){
        message.error("Terjadi Kesalahan pada server");
        localStorage.removeItem("_token");
        navigate("/login");
      }

      if(error.response.status === 401){
        localStorage.removeItem("_token");
        navigate("/login");
      }
    } finally {
      setLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => onClose(false)}
      ></div>
      <form
        onSubmit={handleSave}
        className="bg-white rounded-lg shadow-lg p-6 z-50 w-full md:max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Quote</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Penulis</label>
          <input
            type="text"
            placeholder="Ditulis Oleh"
            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="true">Aktif</option>
            <option value="false">Tidak Aktif</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quotes</label>
          <textarea
            placeholder="Isi Quotes"
            rows={3}
            maxLength={150}
            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-2 flex-col-reverse font-bold">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black hover:bg-gray-900 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            {isLoading ? <PulseLoader size={12} color="white"/> : "Simpan Perubahan"}
      
          </button>
        </div>
      </form>
    
    </div>
  );
};

export default ModalEditQuotest;
