import React, { useRef, useState } from "react";
import { createBrowsur } from "../../../services/Browsur/BrowsurService";
import { message } from "antd";
import { UploadImageArray } from "../../../services/Upload/UploadImage";

const ModalBrowsur = ({ isOpen, onClose, refresh }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(true);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 2) {
      alert("You can only upload a maximum of 2 images");
    } else {
      console.log("Files selected:", event.target.files);
      setSelectedFiles(files);
    }
  };

  const handleDeleteFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    if (newFiles.length === 0) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Menggunakan UploadImage untuk upload setiap file
      const formData = new FormData();

      // Menambahkan file ke dalam FormData menggunakan 'file[]'
      selectedFiles.forEach((file) => {
        formData.append("file[]", file); // Pastikan nama input file di sini adalah 'file[]'
      });

      // Kirim gambar terlebih dahulu
      const imageUrls = await UploadImageArray(formData);

      const data = {
        title: title,
        status: status,
        img_url: imageUrls, // Misalnya, jika URL gambar dikembalikan oleh UploadImageArray
      };

      // Kirim data lainnya ke API createBrowsur
      const response = await createBrowsur(data);

      message.success("Pop up berhasil ditambahkan");
      refresh();
      onClose();
      setSelectedFiles([]);
      fileInputRef.current.value = "";
    } catch (error) {
      // if (error.response?.status === 400) {
      //   message.info(error.response.data.message);
      // } else {
      //   message.error("Terjadi kesalahan pada server");
      //   localStorage.removeItem("_token");
      // }
      console.log(error);
    }
  };

  return (
    <>
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

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value === "true")}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value={true}>Aktif</option>
                  <option value={false}>Non-Aktif</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Gambar (Max 2)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  multiple
                  required
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-black
                             hover:file:bg-blue-100"
                />
                {selectedFiles.length > 0 && (
                  <div className="mt-2">
                    <p>Selected files:</p>
                    <ul className="list-disc pl-5">
                      {Array.from(selectedFiles).map((file, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFile(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                  className="bg-black hover:opacity-90 transition-all text-white font-bold py-2 px-4 rounded"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBrowsur;
