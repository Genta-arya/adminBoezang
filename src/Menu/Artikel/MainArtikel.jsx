import React, { useEffect, useState } from "react";
import HeaderArtikel from "./components/Header";
import ListArtikel from "./components/ListArtikel";
import { getArtikel } from "../../services/Artikel/ArtikelApi";
import { Helmet } from "react-helmet-async";

const MainArtikel = () => {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtikels = async () => {
    try {
      const response = await getArtikel();
      setArtikels(response.data.reverse());
    } catch (error) {
      setError("Terjadi kesalahan saat memuat artikel.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArtikels();
  }, []);
  return (
    <main>
      <Helmet>
        <title>Event & Promo - Boezang Apple</title>
      </Helmet>
      <HeaderArtikel refresh={fetchArtikels} />{" "}
      <ListArtikel
        refresh={fetchArtikels}
        artikels={artikels}
        loading={loading}
        error={error}
      />
    </main>
  );
};

export default MainArtikel;
