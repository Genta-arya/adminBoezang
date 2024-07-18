import React, { useState } from "react";
import { createProduct } from "../../services/Products/Products";
import { toast } from "react-toastify";

const useCreateProduct = () => {
  const [category, setCategory] = useState("");
  const [capacities, setCapacities] = useState([]); // Array for capacities
  const [colors, setColors] = useState([]); // Array for colors (hex values)
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color
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
    const selected = e.target.value;
    setSelectedColor(selected);

    if (selected) {
      const colorHex = DataColor.find((color) => color.name === selected)?.hex;
      if (colorHex && !colors.includes(colorHex)) {
        setColors([...colors, colorHex]);
        setSelectedColor(""); // Clear selected color
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
    formData.append("capacities", JSON.stringify(capacities));
    formData.append("colors", JSON.stringify(colors));
    formData.append("description", description);
    formData.append("name", productName);
    formData.append("price", price.replace(/[^\d]/g, ""));
    if (image) formData.append("image", image);

    try {
      const response = await createProduct(formData);
      toast.success("Produk berhasil ditambahkan");
    } catch (error) {
      if (error.response.data.status === "error") {
        toast.info("Nama Produk Sudah digunakan");
      }
      console.error("Error creating product:", error);
    }
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(rawValue);
    setPrice(formattedValue);
  };
  return {
    capacities,
    category,
    price,
    colors,
    selectedColor,
    description,
    image,
    productName,
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

export default useCreateProduct;
