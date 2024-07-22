import React, { useEffect, useState } from "react";
import { updateProduct } from "../../services/Products/Products";
import { Slide, toast } from "react-toastify";
import useLoadingStores from "../../Zustand/useLoadingStore";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { DataColor } from "../../TypeColor";

const useEditProducts = ({ product, onClose, refresh }) => {
  const [category, setCategory] = useState(product.category || "");
  const [capacities, setCapacities] = useState([]);
  const [colors, setColors] = useState([product.colors]);
  const [selectedColor, setSelectedColor] = useState("");
  const [description, setDescription] = useState(product.description || "");
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const { isLoading, setLoading } = useLoadingStores();
  const capictyValue = product.capacities.map((data) => data.value);
  const navigate = useNavigate();
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

    if (category === "iphone") {
      if (
        description.length < 1 ||
        colors.length < 1 ||
        capacities.length < 1
      ) {
        return toast.info("Data Produk tidak boleh  ada yang kosong");
      }
    }

    setLoading(true);

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

      refresh();
      message.success("Produk Berhasil di Edit");
      onClose(false);
    } catch (error) {
      message.error("Terjadi Masalah Pada server");
      localStorage.removeItem("_token");
      navigate("/login");

      if (error.response.data.status === "error") {
        message.info("Nama Produk Sudah digunakan");
      }

      setLoading(false);
      if (error.response.status === 404) {
        localStorage.removeItem("_token");
        navigate("/login");
      }

      if (error.request) {
        message.error(
          "IP telah diblok sementara karena terlalu banyak melakukan request, silahkan coba beberapa saat lagi"
        );
      } else {
        localStorage.removeItem("_token");
        navigate("/login");
        message.error(error.response?.data?.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
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

  return {
    capacities,
    capictyValue,
    category,
    colors,
    description,
    selectedColor,
    productName,
    price,
    isLoading,
    setDescription,
    handleAddCapacity,
    handleCategoryChange,
    handleColorChange,
    handleImageChange,
    setProductName,
    handlePriceChange,
    handleRemoveCapacity,
    handleRemoveColor,
    handleSubmit,
  };
};

export default useEditProducts;
