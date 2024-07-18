import React, { useEffect, useState } from "react";
import { updateProduct } from "../../services/Products/Products";

const useEditProducts = ({ product, onClose, refresh }) => {
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
      toast.success("Produk berhasil diperbarui", {
        onClose: () => {
          onClose(false);
          refresh();
        },
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

  return {
    capacities,
    capictyValue,
    category,
    colors,
    description,
    selectedColor,
    productName,
    price,
    setDescription,
    handleAddCapacity,
    handleCategoryChange,
    handleColorChange,
    handleImageChange,
    handlePriceChange,
    handleRemoveCapacity,
    handleRemoveColor,
    handleSubmit,
  };
};

export default useEditProducts;
