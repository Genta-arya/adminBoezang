import axios from "axios";

export const UploadImage = async (file) => {
  console.log(file);
  try {
    const response = await axios.post(
      "https://clouds.mystorages.my.id/uploads.php",
      { file: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          genta: "Genta@456",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UploadImageArray = async (files) => {
  try {
    // Membuat FormData untuk mengirim file
    const formData = new FormData();

    // Menambahkan semua file ke dalam formData dengan nama "file[]"
    files.forEach((file) => {
      formData.append("file[]", file); // Pastikan nama input file adalah 'file[]'
    });

    // Mengirim FormData ke server
    const response = await axios.post(
      "https://cloud.mystorages.my.id/uploads.php",
      formData, // Mengirimkan FormData, bukan objek JSON
      {
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type untuk FormData sudah otomatis ditangani
          genta: "Genta@456", // Custom header yang diperlukan
        },
      }
    );

    // Mengembalikan respons dari server
    return response.data;
  } catch (error) {
    console.error(error); // Debugging jika ada error
    throw error;
  }
};
