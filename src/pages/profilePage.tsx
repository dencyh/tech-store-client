import React from "react";
import Auth from "../features/auth/auth";
import Profile from "../features/profile/profile";
import Layout from "./layout";

const ProfilePage = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
};
export default ProfilePage;
