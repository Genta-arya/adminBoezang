import React, { useState } from "react";
import { FaCog, FaPen, FaPlus, FaSearch } from "react-icons/fa";

import ModalAddArtikel from "./ModalAddArtikel";


const HeaderArtikel = ({ refresh, data }) => {
  const [modalAdd, setModalAdd] = useState(false);
  const lengthStatus = data?.filter((item) => item.status === true).length;

  return (
    <div className="container mx-auto lg:px-4 pt-8">
      <div className="flex justify-between lg:flex-row md:flex-row md:gap-3 items-center p-4 bg-gray-200 shadow-md text-black rounded-lg">
        <h1 className="text-2xl font-bold ">Event & Promo</h1>
        <div className="flex items-center gap-2">
          <button
            disabled={lengthStatus >= 5}
            className="bg-black disabled:bg-gray-500  hover:scale-95 ease-in transition-all text-white flex items-center px-4 py-2 rounded hover:bg-gray-900 focus:outline-none"
            onClick={() => setModalAdd(true)}
          >
            <FaPen className="mr-2" />
            Tulis Artikel
          </button>
        </div>
      </div>
      {modalAdd && (
        <ModalAddArtikel
          onClose={setModalAdd}
          isOpen={modalAdd}
          refresh={refresh}
      
        />
      )}
    </div>
  );
};

export default HeaderArtikel;
