import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProduct } from "../../../services/Products/Products";
import { NumberFormatBase } from "react-number-format";

const ModalProduct = () => {
  const [category, setCategory] = useState("");
  const [capacities, setCapacities] = useState([]); // Array for capacities
  const [colors, setColors] = useState([]); // Array for colors
  const [currentColor, setCurrentColor] = useState(""); // State for current color input
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value !== "iphone") {
      setCapacities([]); // Clear capacities if not iPhone
      setColors([]); // Clear colors if not iPhone
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      if (selectedImage.size > 10 * 1024 * 1024) {
        // 10MB in bytes
        toast.error("Ukuran gambar tidak boleh lebih dari 10MB");
        setImage(null); // Clear the image if it exceeds the limit
      } else {
        setImage(selectedImage);
      }
    } else {
      setImage(null);
    }
  };

  const handleAddCapacity = (capacity) => {
    if (capacity && !capacities.includes(capacity)) {
      setCapacities([...capacities, capacity]);
    }
  };

  const handleRemoveCapacity = (capacity) => {
    setCapacities(capacities.filter((c) => c !== capacity));
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleAddColor = (e) => {
    if (e.key === "Enter" && currentColor.trim() !== "") {
      e.preventDefault(); // Prevent form submission on Enter key
      const colorToAdd = currentColor.trim().toLowerCase();
      if (!colors.includes(colorToAdd)) {
        setColors([...colors, colorToAdd]);
        setCurrentColor(""); // Clear current color input
      }
    }
  };

  const handleRemoveColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (description.length < 1) {
      return toast.info("Deskripsi produk tidak boleh kosong");
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("capacities", JSON.stringify(capacities)); // Serialize array to JSON string
    formData.append("colors", JSON.stringify(colors)); // Serialize array to JSON string
    formData.append("description", description);
    formData.append("name", productName);
    formData.append("price", price.replace(/[^\d]/g, ""));
    if (image) formData.append("image", image);

    try {
      const response = await createProduct(formData);
      toast.success("Produk berhasil ditambahkan");
      console.log("Product created:", response);
    } catch (error) {
      if (error.response.data.status === "error") {
        toast.info("Nama Produk Sudah digunakan");
      }
      console.error("Error creating product:", error);
    }
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(rawValue);
    setPrice(formattedValue);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        {/* Pilihan Kategori */}
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
          <label className="block text-sm font-medium mb-2">Nama Product</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Masukkan nama product"
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
            placeholder="Masukkan harga product"
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
              <input
                type="text"
                value={currentColor}
                maxLength={20}
                onChange={handleColorChange}
                onKeyDown={handleAddColor}
                placeholder="Masukkan warna dan tekan Enter"
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {colors.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {colors.map((col, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(col)}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* Nama Produk */}

        {/* Deskripsi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full h-auto overflow-auto bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            theme="snow"
          />
        </div>

        {/* Gambar Produk */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Gambar Product
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black w-full text-white px-4 py-2 rounded hover:bg-gray-900 focus:outline-none"
          >
            Simpan
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModalProduct;
