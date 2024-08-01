import React from "react";
import ListQuotest from "./components/ListQuotest";
import { Helmet } from "react-helmet-async";

const QuotestPage = () => {
  return (
    <main>
       <Helmet>
        <title>Quote - Boezang Apple</title>
      </Helmet>
      <ListQuotest />
    
    </main>
  );
};

export default QuotestPage;
