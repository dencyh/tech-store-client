import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../user/userSlice";
import Sidebar from "./sidebar";
import styles from "./profile.module.scss";
import { useParams } from "react-router-dom";
import Orders from "./sections/orders";
import Details from "./sections/details";
import Addresses from "./sections/addresses";
import Bookmarks from "../bookmarks/bookmarks";
import UserReviews from "./sections/userReviews";
import { Spinner } from "../../components/ui/spinner/spinner";
import Loader from "../../components/loader/loader";

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
      {!currentUser ? (
        <Loader />
      ) : (
        <>
          <h2 className={styles.title}>
            Добрый день, {currentUser.firstName}!
          </h2>
          <div className={styles.container}>
            <Sidebar />
            {content}
          </div>
        </>
      )}
    </>
  );
};
export default Profile;
