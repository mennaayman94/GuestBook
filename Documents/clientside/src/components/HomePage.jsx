import React from "react";
import "../components/NonFixedNavbarExample";
import "../components/FormPage";
import NonFixedNavbarExample from "../components/NonFixedNavbarExample";
import FormPage from "../components/FormPage";
import Footer from "./Footer";
const HomePage = () => {
  return (
    <div>
      <NonFixedNavbarExample />
      <FormPage />
      <Footer />
    </div>
  );
};

export default HomePage;
