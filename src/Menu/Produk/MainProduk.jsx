import React from "react";
import ListProduct from "./components/ListProduct";
import HeaderProduct from "./components/HeaderProduct";
import useGetProducts from "../../Hooks/Products/useGetProducts";
import { ToastContainer } from "react-toastify";
import ListProduk from "./components/ListProduk";

const MainProduk = () => {

  return (
    <main className="">
      {" "}

   
        <ListProduk/>
        

    </main>
  );
};

export default MainProduk;
