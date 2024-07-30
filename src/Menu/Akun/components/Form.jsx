import React, { useState } from "react";
import { changePassword } from "../../../services/Auth/AuthApi";
import { message } from "antd";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import LoadingLottie from "../../../components/Loading";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Form = ({ onClose, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, setLoading } = useLoadingStores();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Periksa apakah password dan konfirmasi password cocok
    if (password !== confirmPassword) {
      message.info("Password dan konfirmasi password tidak cocok");
      return;
    }
    setLoading(true);
    try {
      const response = await changePassword(email, password);
      message.success("Password anda telah di reset");
    } catch (error) {
      message.error("Password anda gagal di reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="password" className="block text-black mb-2">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                placeholder="Masukkan password baru"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-black mb-2">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                placeholder="Konfirmasi password baru"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-gray-800 transition"
          >
            {isLoading ? "Tunggu sebentar" : "Reset Password"}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition w-full"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default Form;
