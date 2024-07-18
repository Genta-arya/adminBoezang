import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const ModalContainer = (props) => {
  const { closeModal, isOpen, children, title } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-0 left-0 right-0 bg-black opacity-70 z-50"
            onClick={() => closeModal(false)}
          ></div>
          <div className="fixed inset-1/4 bg-white p-6 md:w-[70%] lg:w-[55%] md:min-h-[50%] lg:max-h-[65%]  lg:min-h-[65%] overflow-auto rounded-lg shadow-lg z-50">
            <div className="absolute top-4 left-6 text-black font-bold text-xl focus:outline-none">
              {title}
            </div>
            <button
              onClick={() => closeModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FaTimes size={20} />
            </button>
            <div className="py-8">{children}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalContainer;
