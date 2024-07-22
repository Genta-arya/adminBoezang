import React, { useState } from "react";
import LoadingLottie from "../../../components/Loading";
import { updateSingleStatus } from "../../../services/Artikel/ArtikelApi";
import { MoonLoader } from "react-spinners";
import ModalEditArtikel from "./ModalEditArtikel";

import ReactMarkdown from "react-markdown";
import ToggleSwitch from "../../../components/ToggleStatus";
const ListArtikel = ({ setLoading, loading, artikels, error, refresh }) => {
  const [status, setStatus] = useState(false);
  const [edit, isEdit] = useState(false);
  const [selectData, setSelectedData] = useState(null);

  const handleEdit = (data) => {
    setSelectedData(data);
    isEdit(true);
  };

  if (loading) {
    return <LoadingLottie />;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  const handleToggleStatus = async (id, status) => {
    setStatus(true);
    try {
      await updateSingleStatus(id, status);
      refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatus(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white">
        {artikels.map((artikel) => (
          <li
            key={artikel.id}
            className="border shadow-md rounded-lg overflow-hidden group"
          >
            <div className="relative flex justify-center py-4">
              <img
                src={artikel.thumbnail || "https://via.placeholder.com/150"}
                alt={artikel.title}
                className="w-52 transition-transform duration-300 ease-in-out transform group-hover:scale-95"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEdit(artikel)}
                  className="bg-black border hover:bg-gray-900 text-white px-4 py-2 rounded w-32"
                >
                  Edit
                </button>
                <button className="bg-red-500 border hover:bg-red-700 text-white px-4 py-2 rounded w-32">
                  Hapus
                </button>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2 items-center justify-end mb-4">
                {status ? (
                  <>
                    <MoonLoader size={12} className="text-black" />
                  </>
                ) : (
                  <p className="text-sm font-bold">
                    {artikel.status ? "Matikan" : "Aktifkan"}
                  </p>
                )}
                <ToggleSwitch
                  initialChecked={artikel.status}
                  status={status}
                  onChange={(checked) =>
                    handleToggleStatus(artikel.id, checked)
                  }
                />
              </div>
              <div className="flex flex-wrap justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{artikel.title}</h2>
              </div>

              <p className="text-gray-700 mb-2 text-xs">
                Posted by {artikel.author}
              </p>
              <p className="text-gray-500 text-xs">
                {formatDate(artikel.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {edit && (
        <ModalEditArtikel
          data={selectData}
          isOpen={edit}
          onClose={isEdit}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default ListArtikel;
