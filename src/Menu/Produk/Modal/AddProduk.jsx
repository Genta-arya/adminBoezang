import React, { useState } from "react";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa"; // Import the delete icon
import axios from "axios";
import { createProduct } from "../../../services/Products/Products";
import { DataColor } from "../../../TypeColor";
import { formatPrice } from "../../../Utils";
import { message } from "antd";
import ReactQuill from "react-quill";
import { set } from "date-fns";
import { Editor } from "@tinymce/tinymce-react";
import { UploadImage } from "../../../services/Upload/UploadImage";
import LoadingLottie from "../../../components/Loading";

const kapasitasOptions = [64, 128, 256, 512];

const AddProduk = ({ onClose, refresh }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [spesifikasi, setSpesification] = useState("");
  const [variants, setVariants] = useState([
    {
      name: "produk",
      kapasitas: "",
      price: "",
      colorVariants: [""],
      quality: true, // Default to "Baru"
    },
  ]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleColorChange = (variantIndex, colorIndex, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].colorVariants[colorIndex] = value;
    setVariants(newVariants);
  };

  const addColorVariant = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].colorVariants.push("");
    setVariants(newVariants);
  };

  const removeColorVariant = (variantIndex, colorIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].colorVariants.splice(colorIndex, 1);
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "produk",
        kapasitas: "",
        price: "",
        colorVariants: [""],
        quality: true,
      },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const variant of variants) {
      // Periksa apakah ada field yang kosong
      if (!variant.price || !variant.colorVariants.every((color) => color)) {
        return message.info(
          "Periksa kembali form variant tidak boleh ada yang kosong"
        );
      }

      // Cek khusus untuk kategori "iphone"
      if (category === "iphone" && !variant.kapasitas) {
        return alert("Please select kapasitas for each iPhone variant.");
      }
    }

    if (description.length < 1) {
      return message.info("Deskripsi produk tidak boleh kosong");
    }

    setLoading(true);

    try {
      let img_url = null;
      if (image) {
        // Upload gambar
        const uploadFoto = await UploadImage(image);
        img_url = uploadFoto.file_url; // Menyimpan URL gambar
        setImage(img_url); // Menyimpan URL gambar di state jika diperlukan
      }

      const productData = {
        name,
        spesifikasi,
        desc: description,
        category,
        variants: JSON.stringify(variants),
        img_url, // Menyertakan URL gambar jika ada
      };

      // Kirim data produk dalam format JSON
      await createProduct(productData);
      message.success("Product added successfully");
      onClose(false);
      refresh();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    <LoadingLottie />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="lg:w-[50%] md:w-[70%]  mx-auto p-6 bg-white shadow-lg rounded-lg z-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold ">Tambah Produk</h1>
          <button
            onClick={() => onClose(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className=" lg:h-[500px] md:h-[500px] overflow-auto space-y-4 ">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Nama Produk:</label>
              <input
                type="text"
                placeholder="Masukkan Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Kategori:</label>
              <select
                value={category}
                placeholder="Masukkan Kategori"
                onChange={(e) => setCategory(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Pilih Kategori</option>
                <option value="iphone">Iphone</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Pilih Status</option>
                <option value={true}>Aktif</option>
                <option value={false}>Mati</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Image:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Keterangan
              </label>
              <Editor
                apiKey="gne0tu6k3iyh6uv3gc01ui2l980ve69xi0h7iwelw6sf2uvg"
                value={description}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                    "image",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | image",
                  image_advtab: true,
                  menu: {
                    file: {
                      title: "File",
                      items:
                        "newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations",
                    },
                    edit: {
                      title: "Edit",
                      items:
                        "undo redo | cut copy paste pastetext | selectall | searchreplace",
                    },
                    view: {
                      title: "View",
                      items:
                        "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
                    },
                    insert: {
                      title: "Insert",
                      items:
                        "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
                    },
                    format: {
                      title: "Format",
                      items:
                        "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
                    },
                    tools: {
                      title: "Tools",
                      items:
                        "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
                    },
                    table: {
                      title: "Table",
                      items:
                        "inserttable | cell row column | advtablesort | tableprops deletetable",
                    },
                    help: { title: "Help", items: "help" },
                  },
                }}
                onEditorChange={setDescription}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Spesifikasi
              </label>
              <Editor
                apiKey="gne0tu6k3iyh6uv3gc01ui2l980ve69xi0h7iwelw6sf2uvg"
                value={spesifikasi}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                    "image",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | image",
                  image_advtab: true,
                  menu: {
                    file: {
                      title: "File",
                      items:
                        "newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations",
                    },
                    edit: {
                      title: "Edit",
                      items:
                        "undo redo | cut copy paste pastetext | selectall | searchreplace",
                    },
                    view: {
                      title: "View",
                      items:
                        "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
                    },
                    insert: {
                      title: "Insert",
                      items:
                        "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
                    },
                    format: {
                      title: "Format",
                      items:
                        "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
                    },
                    tools: {
                      title: "Tools",
                      items:
                        "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
                    },
                    table: {
                      title: "Table",
                      items:
                        "inserttable | cell row column | advtablesort | tableprops deletetable",
                    },
                    help: { title: "Help", items: "help" },
                  },
                }}
                onEditorChange={setSpesification}
              />
            </div>

            {variants.map((variant, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-md relative"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Variant {index + 1}
                </h3>
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}

                {category === "iphone" && (
                  <div className="flex flex-col mb-4">
                    <label className="font-medium mb-1">Kapasitas:</label>
                    <select
                      value={variant.kapasitas}
                      placeholder="Masukkan Kapasitas"
                      onChange={(e) =>
                        handleVariantChange(index, "kapasitas", e.target.value)
                      }
                      required
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Kapasitas</option>
                      {kapasitasOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} GB
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex flex-col mb-4">
                  <label className="font-medium mb-1">Kualitas:</label>
                  <select
                    value={variant.quality}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "quality",
                        e.target.value === "true"
                      )
                    }
                    required
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="true">Baru</option>
                    <option value="false">Second</option>
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="font-medium mb-1">Harga:</label>
                  <input
                    type="text"
                    min={1}
                    value={formatPrice(variant.price)}
                    required
                    placeholder="Masukkan Harga"
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "price",
                        e.target.value.replace(/[^\d]/g, "")
                      )
                    }
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="font-medium mb-1">Color Variants:</label>
                  {variant.colorVariants.map((color, colorIndex) => (
                    <div key={colorIndex} className="flex items-center mb-2">
                      <select
                        value={color}
                        placeholder="Masukkan Warna"
                        required
                        onChange={(e) =>
                          handleColorChange(index, colorIndex, e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 flex-1"
                      >
                        <option value="">Select Color</option>
                        {DataColor.map((colorOption) => (
                          <option key={colorOption.hex} value={colorOption.hex}>
                            {colorOption.name}
                          </option>
                        ))}
                      </select>
                      {variant.colorVariants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColorVariant(index, colorIndex)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addColorVariant(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    + Warna
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex  gap-2 pt-2 ">
            <button
              type="button"
              onClick={addVariant}
              className="border w-full text-black border-black py-2 px-4 rounded-md "
            >
              <div className="flex items-center gap-2 justify-center">
                <FaPlus />
                <p>Tambah Variant</p>
              </div>
            </button>
            <button
              disabled={loading}
              type="submit"
              className="bg-black w-full text-white py-2 px-4 rounded-md hover:bg-gray-900"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduk;
