import React from "react";
import { FaBox, FaChartBar, FaCog, FaFileAlt, FaImage, FaSignOutAlt } from "react-icons/fa";
import useMenuStore from "../Zustand/useMenuStore";
import { FaTextSlash } from "react-icons/fa6";
import useAuthStore from "../Zustand/useAuthStore";
import { Logout } from "../services/Auth/AuthApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import useLoadingStores from "../Zustand/useLoadingStore";
import icon from "../assets/icon.png"
const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useMenuStore();
  const { token, logout } = useAuthStore();
  const { isLoading, setLoading } = useLoadingStores();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await Logout(token);
      logout();
      navigate("/login");
      localStorage.removeItem("_token");
    } catch (error) {
      if (error.response.status === 500) {
        message.error("Terjadi masalah pada server");
        localStorage.removeItem("_token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="bg-black text-white w-52 min-h-screen p-4 fixed top-0 left-0 border-r-2 border-white  ">
      <nav>
        <div className="flex justify-center">
          <img
            src={icon}
            alt=""
            className="bg-white rounded-full p-1 w-20 mb-8"
          />
        </div>
        <ul>
          <li className="mb-4">
            <a
              onClick={() => setActiveMenu("produk")}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "produk" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaBox className="mr-2" /> Produk
            </a>
          </li>

          <li className="mb-4">
            <a
              onClick={() => setActiveMenu("browsur")}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "browsur" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaImage className="mr-2" /> Pop up Harga
            </a>
          </li>

          <li className="mb-4">
            <a
              onClick={() => setActiveMenu("event")}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "event" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaFileAlt className="mr-2" /> Event & Promo
            </a>
          </li>

          <li className="mb-4">
            <a
              onClick={() => setActiveMenu("quotest")}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "quotest" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaTextSlash className="mr-2" /> Quotes
            </a>
          </li>
          <li className="mb-4">
            <a
              onClick={() => setActiveMenu("trafic")}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "trafic" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaChartBar className="mr-2" /> Trafic Pengunjung
            </a>
          </li>

          <li className="mb-4">
            <a
              onClick={() => setActiveMenu("akun")}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "akun" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaCog className="mr-2" /> Setting Akun
            </a>
          </li>

          <li className="mb-4">
            <a
              onClick={() => handleLogout()}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeMenu === "signout" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaSignOutAlt className="mr-2" /> SignOut
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
