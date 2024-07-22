import React from "react";
import { StopPromo } from "../../../services/Products/Promo";
import { toast, ToastContainer } from "react-toastify";
import { message } from "antd";
import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const ButtonSettingPromo = ({ data, refresh }) => {
  const handleStopPromo = async (promoId) => {
    try {
      const response = await StopPromo(promoId, true); // Panggil layanan backend untuk menghentikan promo

      refresh();
      message.success("Promo telah dihentikan");
    } catch (error) {
      if (error.response.status === 500) {
        message.error("Terjadi masalah pada server");
        localStorage.removeItem("_token");
        navigate("/login");
      }
      if (error.response.status === 401) {
        localStorage.removeItem("_token");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        {data.promos.length > 0 && (
          <div>
            {data.promos.map((promo) => (
              <button
                key={promo.id}
                onClick={() => handleStopPromo(promo.id)}
                className="bg-red-500 text-xs font-bold text-white rounded-lg py-1 px-2 "
              >
                <div className="flex items-center gap-2">
                  <AiOutlineLogout className="text-white" />
                  <p>Matikan Promo</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ButtonSettingPromo;
