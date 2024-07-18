import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProduct } from "../../../services/Products/Products";
import { DataColor } from "../../../TypeColor";

const ModalEditProduct = ({ product, onClose , refresh }) => {
  const [category, setCategory] = useState(product.category || "");
  const [capacities, setCapacities] = useState([]);
  const [colors, setColors] = useState([product.colors]);
  const [selectedColor, setSelectedColor] = useState("");
  const [description, setDescription] = useState(product.description || "");
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");

  const capictyValue = product.capacities.map((data) => data.value);

  useEffect(() => {
    setCategory(product.category || "");

    
    setCapacities(capictyValue || []);

    const colorValues = product.colors.map((color) => color.value);
    setColors(colorValues);
    setDescription(product.description || "");
    setProductName(product.name || "");
    setPrice(
      product.price
        ? new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(product.price)
        : ""
    );
  }, [product]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value !== "iphone") {
      setCapacities([]);
      setColors([]);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      if (selectedImage.size > 10 * 1024 * 1024) {
        toast.error("Ukuran gambar tidak boleh lebih dari 10MB");
        setImage(null);
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
    const selected = e.target.value;
    setSelectedColor(selected);

    if (selected) {
      const colorHex = DataColor.find((color) => color.name === selected)?.hex;
      if (colorHex && !colors.includes(colorHex)) {
        setColors([...colors, colorHex]);
        setSelectedColor("");
      }
    }
  };

  const handleRemoveColor = (colorHex) => {
    setColors(colors.filter((c) => c !== colorHex));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (description.length < 1 || colors.length < 1 || capacities.length < 1) {
      return toast.info("Data Produk tidak boleh  ada yang kosong");
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("capacities", JSON.stringify(capacities));
    formData.append("colors", JSON.stringify(colors));
    formData.append("description", description);
    formData.append("name", productName);
    formData.append("price", price.replace(/[^\d]/g, ""));
    if (image) formData.append("image", image);

    try {
      await updateProduct(product.id, formData);
      toast.success("Produk berhasil diperbarui" , {
        onClose: () => {
          onClose(false)
          refresh()
        }
      });

    } catch (error) {
      if (error.response.data.status === "error") {
        toast.info("Nama Produk Sudah digunakan");
      }
      console.error("Error updating product:", error);
    }
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(rawValue);
    setPrice(formattedValue); // Simpan harga dalam format string yang benar
  };

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
