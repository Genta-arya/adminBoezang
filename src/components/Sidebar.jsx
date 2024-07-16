import React from "react";
import { FaBox, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import useMenuStore from "../Zustand/useMenuStore";

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useMenuStore();

  return (
    <aside className="bg-black text-white w-52 min-h-screen p-4 fixed top-0 left-0 border-r-2 border-white  ">
      <nav>
        <div className="flex justify-center">
          <img
            src="https://boezang-apple-development.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon.e16eee5c.png&w=256&q=75"
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
              onClick={() => setActiveMenu("signout")}
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
