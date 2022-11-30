import React from "react";
import Navbar from "../components/ui/navbar";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
