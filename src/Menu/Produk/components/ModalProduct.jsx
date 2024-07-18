import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DataColor } from "../../../TypeColor";
import useCreateProduct from "../../../Hooks/Products/useCreateProduct";

const ModalProduct = () => {
  const {
    capacities,
    category,
    colors,
    description,
    setDescription,
    handleAddCapacity,
    handleCategoryChange,
    handleColorChange,
    handleImageChange,
    handlePriceChange,
    handleRemoveCapacity,
    handleRemoveColor,
    handleSubmit,
    productName,
    price,
    selectedColor,
  } = useCreateProduct();

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

        {/* Nama Produk */}
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

        {/* Harga */}
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
            {/* Kapasitas */}
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
                  {capacities.map((cap, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {cap}
                      <button
                        type="button"
                        onClick={() => handleRemoveCapacity(cap)}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Warna */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Warna</label>
              <select
                value={selectedColor}
                onChange={handleColorChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Pilih Warna</option>
                {DataColor.map((color) => (
                  <option key={color.hex} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>
              {colors.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {colors.map((colorHex, index) => {
                    const colorName = DataColor.find(
                      (color) => color.hex === colorHex
                    )?.name;
                    return (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        {colorName || colorHex}
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

        {/* Deskripsi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full h-auto overflow-auto bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Gambar */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          type="submit"
          className="bg-black w-full text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          Tambah Produk
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModalProduct;
