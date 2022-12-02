import React from "react";
import Auth from "../features/auth/auth";
import Layout from "./layout";

const ProfilePage = () => {
  const userIn = true;

  return (
    <Layout>{userIn ? <h1>ProfilePage in development</h1> : <Auth />}</Layout>
  );
};
export default ProfilePage;
