import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import { PulseLoader } from "react-spinners";
import { updateArtikel } from "../../../services/Artikel/ArtikelApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const ModalEditArtikel = ({ data, onClose, isOpen, refresh }) => {
  const [title, setTitle] = useState(data.title || "");
  const [author, setAuthor] = useState(data.author || "");
  const [status, setStatus] = useState(data.status || false);
  const [content, setContent] = useState(data.content || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("status", status);
    formData.append("content", content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await updateArtikel(data.id, formData);
      refresh();
      onClose(false);
      message.success("Artikel Berhasil diupdate");
    } catch (error) {
      message.error("Terjadi kesalahan saat menambahkan artikel.");
      navigate("/login");
      localStorage.removeItem("_token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        !isOpen ? "hidden" : ""
      }`}
    >
      <div className="bg-white text-black rounded-lg shadow-lg p-6 w-[50%]">
        <h2 className="text-2xl font-bold mb-4">Edit Artikel</h2>
        <form onSubmit={handleSubmit}>
          <div className="h-[500px] overflow-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Judul
              </label>
              <input
                type="text"
                placeholder="Judul Artikel"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium mb-2"
              >
                Penulis
              </label>
              <input
                type="text"
                id="author"
                placeholder="Penulis Artikel"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          
       
            <div className="mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium mb-2"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              {/* <ReactQuill
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                ]}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    ["link"],
                    ["clean"],
                  ],
                }}
                theme="snow"
                placeholder="Masukkan Konten Artikel"
                value={content}
                onChange={setContent}
              /> */}
               <Editor
                  apiKey="gne0tu6k3iyh6uv3gc01ui2l980ve69xi0h7iwelw6sf2uvg"
                  value={content}
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
                  onEditorChange={setContent}
                />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-black text-white font-bold rounded hover:bg-gray-800"
            >
              {isLoading ? (
                <PulseLoader size={12} color="white" />
              ) : (
                "Simpan Perubahan"
              )}
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="w-full py-2 px-4 bg-gray-200 text-black border border-black font-bold rounded hover:bg-gray-100"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditArtikel;
