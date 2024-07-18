import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProduct } from "../../../services/Products/Products";
import { DataColor } from "../../../TypeColor";
import useEditProducts from "../../../Hooks/Products/useEditProducts";

const ModalEditProduct = ({ product, onClose, refresh }) => {
  const {
    capacities,
    capictyValue,
    category,
    colors,
    description,
    handleAddCapacity,
    handleCategoryChange,
    handleColorChange,
    handleImageChange,
    handlePriceChange,
    handleRemoveCapacity,
    handleRemoveColor,
    handleSubmit,
    setDescription,
    selectedColor,
    price,
    productName,
  } = useEditProducts({ product, onClose, refresh });

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Kategori</label>
          <select
            value={category}
            required
            onChange={handleCategoryChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="iphone">iPhone</option>
            <option value="aksesoris">Aksesoris</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nama Produk</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Masukkan nama produk"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Harga</label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Masukkan harga produk"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {category === "iphone" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Kapasitas
              </label>
              <select
                onChange={(e) => handleAddCapacity(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Pilih Kapasitas</option>
                <option value="64">64 GB</option>
                <option value="128">128 GB</option>
                <option value="256">256 GB</option>
                <option value="512">512 GB</option>
              </select>
              {capacities.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {capacities.map((capacity, index) => (
                    <li
                      key={index} // Anda bisa menggunakan index di sini karena kapasitas adalah string
                      className="flex justify-between items-center"
                    >
                      {capacity} GB
                      <button
                        type="button"
                        onClick={() => handleRemoveCapacity(capacity)}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Warna</label>
              <select
                value={selectedColor}
                onChange={handleColorChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Pilih Warna</option>
                {DataColor.map((color, index) => (
                  <option key={index + 1} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>
              {colors.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {colors.map((colorHex) => {
                    const colorName = DataColor.find(
                      (colorData) => colorData.hex === colorHex.value
                    )?.name;

                    return (
                      <li
                        key={colorHex}
                        className="flex justify-between items-center"
                      >
                        {colorName}{" "}
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colorHex }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(colorHex)}
                          className="ml-2 text-red-500"
                        >
                          &times;
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4"
          />
        </div>

        <button
          type="submit"
          className="bg-black w-full text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          Simpan Perubahan
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModalEditProduct;
