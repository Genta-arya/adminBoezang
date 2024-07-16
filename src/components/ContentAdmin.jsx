// src/components/ContentAdmin.js
import React from "react";
import useMenuStore from "../Zustand/useMenuStore";
import MainProduk from "../Menu/Produk/MainProduk";

const ContentAdmin = () => {
  const { activeMenu } = useMenuStore();

  const renderContent = () => {
    switch (activeMenu) {
      case "produk":
        return <MainProduk />;
      case "event":
        return <div>Ini adalah konten untuk Event & Promo</div>;
      case "signout":
        return (
          <div>
            Anda telah memilih SignOut. Implementasikan logika logout di sini.
          </div>
        );
      default:
        return <div>Silakan pilih menu</div>;
    }
  };

  return <div className="flex-1 p-6 bg-gray-100">{renderContent()}</div>;
};

export default ContentAdmin;
