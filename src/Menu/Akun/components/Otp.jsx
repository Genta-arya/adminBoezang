import React, { useState, useRef } from "react";
import { verifyOtp } from "../../../services/Auth/AuthApi";
import Form from "./Form"; // Import Form component
import { message } from "antd";
import useLoadingStores from "../../../Zustand/useLoadingStore";
import LoadingLottie from "../../../components/Loading";

const Otp = ({ onClose, email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [isVerified, setIsVerified] = useState(false);
  const { isLoading, setLoading } = useLoadingStores();
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Update OTP state
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      newOtp.forEach((_, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index].value = newOtp[index];
        }
      });
    }
    e.preventDefault();
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    try {
      setLoading(true);
       await verifyOtp({ email, code: otpCode });

      setIsVerified(true);
    } catch (error) {
      if (error.response.status === 400) {
        message.info(error.response.data.message);
      } else {
        message.error("Terjadi kesalahan pada server ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-black mb-4 text-center">
          Masukkan OTP
        </h1>
        <div className="flex space-x-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center border rounded-lg text-black text-xl focus:outline-none focus:ring-2 focus:ring-black"
              maxLength="1"
            />
          ))}
        </div>
        <div className="flex flex-col-reverse gap-2 mt-4">
          <button
            type="button"
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            disabled={!otp.every((digit) => digit) || isLoading}
            className="bg-black disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition"
            onClick={handleSubmit}
          >
         {isLoading ? "Sedang memverifikasi OTP" : "Kirim OTP"}
           
          </button>
        </div>
        {isVerified && <Form onClose={onClose} email={email} />}{" "}
      </div>
    </div>
  );
};

export default Otp;
