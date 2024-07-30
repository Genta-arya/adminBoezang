// src/components/ContentAdmin.js
import React from "react";
import useMenuStore from "../Zustand/useMenuStore";
import MainProduk from "../Menu/Produk/MainProduk";
import QuotestPage from "../Menu/Quotest/QuotestPage";
import MainArtikel from "../Menu/Artikel/MainArtikel";
import BrowsurPage from "../Menu/Browsur/BrowsurPage";

const ContentAdmin = () => {
  const { activeMenu } = useMenuStore();

  const renderContent = () => {
    switch (activeMenu) {
      case "produk":
        return <MainProduk />;
      case "event":
        return <MainArtikel />

      case "quotest":
        return <QuotestPage />;

        
      case "browsur":
        return <BrowsurPage />;
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

  return <div className="flex-1 p-6 h-dvh">{renderContent()}</div>;
};

export default ContentAdmin;
