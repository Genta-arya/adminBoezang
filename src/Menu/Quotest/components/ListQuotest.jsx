import React, { useState } from "react";

import ModalEditQuotest from "./ModalEditQuotest";
import { ToastContainer } from "react-toastify";
import useGetQuotes from "../../../Hooks/Quotes/useGetQuotes";
import HeaderQuotest from "./HeaderQuotest";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import LoadingLottie from "../../../components/Loading";
import { DeleteQuotest } from "../../../services/Quotest/ApiQuotest";
import { message } from "antd";

const ListQuotest = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { quotes, fetchQuotest } = useGetQuotes();
  const { isLoading, setLoading } = useLoadingStores();
  const lengthStatus = quotes?.filter((item) => item.status === true).length;

  const handleEditClick = (quote) => {
    setSelectedQuote(quote);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await DeleteQuotest(id);
      fetchQuotest();
      message.success("Quotes Berhasil dihapus");
    } catch (error) {
      if (error.response.status === 500) {
        message.error("Terjadi Kesalahan pada server");
        localStorage.removeItem("_token");
        window.location.reload();
      }

      if (error.response.status === 401) {
        localStorage.removeItem("_token");
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedQuote(null);
  };
  if (isLoading)
    return (
      <>
        <LoadingLottie />
      </>
    );

  return (
    <>
      <HeaderQuotest fetchQuotest={fetchQuotest} data={quotes} />
      <div className="container mx-auto p-4">
        {quotes.length === 0 ? (
          <p className="text-center mt-20 font-bold">Tidak ada quotes</p>
        ) : (
          <>
            <table className="min-w-full bg-white ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Pesan</th>
                  <th className="py-2 px-4 border-b">Penulis</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td className="py-2 px-4 border-b max-w-96">
                      {quote.content}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {quote.author}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          quote.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex gap-2 text-sm justify-center">
                        <button
                        disabled={lengthStatus >= 5}
                          onClick={() => handleEditClick(quote)}
                          className="bg-blue-600 disabled:bg-gray-500 text-white px-4 py-2 rounded w-20"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(quote.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded w-20"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {lengthStatus >= 5 && (
              <p className="text-center mt-8 text-red-500 text-sm font-bold">
                *Quotes sudah mencapai maksimal*
              </p>
            )}
          </>
        )}

        {isEditModalOpen && (
          <ModalEditQuotest
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            quote={selectedQuote}
            refresh={fetchQuotest}
          />
        )}
      </div>
    </>
  );
};

export default ListQuotest;
