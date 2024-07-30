import React, { useEffect, useState } from "react";
import {
  DeleteBrowsur,
  getBrowsur,
  UpdateStatusBrowsur,
} from "../../../services/Browsur/BrowsurService";
import { FaEdit } from "react-icons/fa";
import LoadingLottie from "../../../components/Loading";
import ModalEditTitle from "./ModalEditTitle";
import { data } from "autoprefixer";
import ModalEditSingleImage from "./ModalEditSingleImage";
import { message } from "antd";

const ListBrowsur = ({ loading, browsurs, error, refresh, setLoading }) => {
  const [selectedData, setSelecetedData] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editSingleImage, setEditSingleImage] = useState(false);
  if (loading) {
    return <LoadingLottie />;
  }

  const handleEdit = (data) => {
    // Implement edit logic here
    setSelecetedData(data);
    setOpenEdit(true);
  };

  const handleEditSingleImage = (data) => {
    setSelecetedData(data);
    setEditSingleImage(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await DeleteBrowsur(id);
      refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (id, status) => {
    
    setLoading(true);

 
    const newStatus = status === true ? false : true;
    console.log(newStatus)

    try {
      await UpdateStatusBrowsur({id, status:newStatus});

      refresh();
      message.success("Status berhasil diupdate");
    } catch (error) {
        if (error.response.status === 400) {
          message.info(error.response.data.message);
        } else {
          message.error("Terjadi kesalahan pada server");
        }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-8 px-4">
      {browsurs.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada Daftar Popup</p>
      ) : (
        <ul className="space-y-4">
          {browsurs.map((browsur) => (
            <li
              key={browsur.id}
              className="flex justify-between flex-wrap items-center p-4  bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">
                      PopUp {browsur.title}
                    </h3>
                    <FaEdit
                      title="Edit Title"
                      onClick={() => handleEdit(browsur)}
                      className="cursor-pointer mr-6"
                    />
                  </div>
                  <p
                    className={`text-sm ${
                      browsur.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Status: {browsur.status ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {browsur.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Browsur"
                      className="w-32 object-cover rounded-md"
                    />
                    <div
                      className="absolute bg-white p-2 border border-gray-500 rounded-br-md top-0 left-0 right-0  text-black  w-fit cursor-pointer"
                      onClick={() => {
                        handleEditSingleImage(image);
                      }}
                    >
                      <FaEdit
                        title="Edit Image"
                        className="text-black font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(browsur.id)}
                  className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition w-24"
                >
                  Hapus
                </button>
                <button
                  onClick={() => handleChangeStatus(browsur.id, browsur.status)}
                  className={`font-semibold py-1 px-3 rounded transition ${
                    browsur.status
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {browsur.status ? "Deactivate" : "Activate"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {openEdit && (
        <ModalEditTitle
          data={selectedData}
          onClose={() => setOpenEdit(false)}
          isOpen={openEdit}
          refresh={refresh}
        />
      )}
      {editSingleImage && (
        <ModalEditSingleImage
          data={selectedData}
          onClose={() => setEditSingleImage(false)}
          isOpen={editSingleImage}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default ListBrowsur;
