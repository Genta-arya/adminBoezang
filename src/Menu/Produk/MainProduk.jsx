import React from "react";

import ListProduk from "./components/ListProduk";
import { Helmet } from "react-helmet-async";

const MainProduk = () => {
  return (
    <main className="">
      {" "}
      <Helmet>
        <title>Produk - Boezang Apple</title>
      </Helmet>
      <ListProduk />
    </main>
  );
};

export default MainProduk;
