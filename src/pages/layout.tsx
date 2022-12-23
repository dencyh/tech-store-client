import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../features/navbar";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="container" style={{ marginTop: "20px" }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
