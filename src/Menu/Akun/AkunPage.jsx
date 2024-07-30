import React, { useState } from "react";
import HeaderAkun from "./components/HeaderAkun";
import useAuthStore from "../../Zustand/useAuthStore";
import Otp from "./components/Otp";
import { createOtp } from "../../services/Auth/AuthApi";
import useLoadingStores from "../../Zustand/useLoadingStore";
import { message } from "antd";
import LoadingLottie from "../../components/Loading";

const AkunPage = () => {
  const { email } = useAuthStore();

  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const { isLoading, setLoading } = useLoadingStores();
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await createOtp({ email });
      if (response.status === 200) {
        setOtpModalVisible(true);
        message.success("OTP Reset Password Terkirim , periksa Email anda");
      }
    } catch (error) {
      message.error("Terjadi kesalahan pada server , Gagal mendapatkan OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderAkun />
      <div className="py-12 px-4 flex flex-col items-center">
        <div className="max-w-2xl flex flex-col">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="border rounded-lg p-2 mb-4 w-80 text-black"
            readOnly
          />
          <button
            onClick={handleSendOtp}
            disabled={isLoading}
            className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            {isLoading ? "Sedang mengirim OTP" : "Kirim OTP Reset Password"}
          </button>
        </div>
      </div>
      {otpModalVisible && (
        <Otp onClose={() => setOtpModalVisible(false)} email={email} />
      )}
    </>
  );
};

export default AkunPage;
