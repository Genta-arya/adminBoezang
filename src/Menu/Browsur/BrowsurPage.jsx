import React, { useEffect, useState } from "react";
import HeaderBrowsur from "./components/Header";
import ListBrowsur from "./components/ListBrowsur";
import { getBrowsur } from "../../services/Browsur/BrowsurService";

const BrowsurPage = () => {
    const [browsurs, setBrowsurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchBrowsurs = async () => {
      try {
        const response = await getBrowsur(); 
        setBrowsurs(response.data); 
      } catch (err) {
        setError('Failed to load browsurs.'); 
      } finally {
        setLoading(false); 
      }
    };

    useEffect(() => {
      fetchBrowsurs(); 
    }, []);
  return (
    <>
      <HeaderBrowsur  refresh={fetchBrowsurs}/>
      <ListBrowsur browsurs={browsurs}  error={error} loading={loading} refresh={fetchBrowsurs} setLoading={setLoading}/>
    </>
  );
};

export default BrowsurPage;