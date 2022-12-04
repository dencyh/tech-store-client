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
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
