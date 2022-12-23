import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../auth/userSlice";
import Sidebar from "./sidebar";
import styles from "./profile.module.scss";
import { useParams } from "react-router-dom";
import Orders from "./profileItems/orders";
import Details from "./profileItems/details";
import Addresses from "./profileItems/addresses";
import Bookmarks from "../bookmarks/bookmarks";
import UserReviews from "./profileItems/userReviews";

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { path } = useParams();

  let content;

  switch (path) {
    case "orders":
      content = <Orders />;
      break;
    case "details":
      content = <Details />;
      break;
    case "address":
      content = <Addresses />;
      break;
    case "bookmarks":
      content = <Bookmarks />;
      break;
    case "reviews":
      content = <UserReviews />;
      break;
    default:
      content = <Details />;
      break;
  }

  return (
    <>
      <h2 className={styles.title}>Добрый день, {currentUser?.firstName}!</h2>
      <div className={styles.container}>
        <Sidebar />
        {content}
      </div>
    </>
  );
};
export default Profile;
