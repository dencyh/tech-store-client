import React, { Component, ReactElement, ReactNode } from "react";
import {
  selectCurrentUser,
  useGetCurrentUserQuery
} from "../features/user/userSlice";
import { useAppSelector } from "../redux/hooks";
import { Navigate, Route } from "react-router-dom";
import Loader from "./loader/loader";
import Layout from "../pages/layout";

interface Props {
  children: ReactElement;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, requireAdmin }) => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  if (isLoading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  if (requireAdmin) return <Navigate to="/" />;
  if (!currentUser) return <Navigate to="/" />;
  return children;
};
export default ProtectedRoute;
