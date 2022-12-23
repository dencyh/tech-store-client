import {
  faBox,
  faComment,
  faHeart,
  faRightFromBracket,
  faTruckFast,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { objectKeys } from "../../utils/objectIterator";
import styles from "./sidebar.module.scss";

const MenuItems = {
  "История заказов": [
    { text: "История заказов", icon: faBox, link: "/profile/orders" }
  ],
  Профиль: [
    {
      text: "Личные данные",
      icon: faUser,
      link: "/profile/details"
    },
    { text: "Ваши адреса", icon: faTruckFast, link: "/profile/address" }
  ],
  Активность: [
    {
      text: "Избранное",
      icon: faHeart,
      link: "/profile/bookmarks"
    },
    { text: "Ваши отзывы", icon: faComment, link: "/profile/reviews" }
  ],
  Выход: [
    { text: "Выйти из аккаунта", icon: faRightFromBracket, link: "/logout" }
  ]
};

const Sidebar = () => {
  const { path } = useParams();
  const activePath = "/profile/" + (path || "details");

  return (
    <ul className={styles.sidebar_container}>
      {objectKeys(MenuItems).map((sectionTitle) => {
        const section = MenuItems[sectionTitle];

        if (section.length > 1) {
          return (
            <li key={sectionTitle} className={styles.sidebar_section}>
              <h4 className={styles.sidebar_section_title}>{sectionTitle}</h4>
              <ul>
                {section.map((sectionItem) => (
                  <li
                    key={sectionItem.text}
                    className={`${styles.sidebar_item} ${
                      activePath === sectionItem.link ? styles.active_item : ""
                    }`}
                  >
                    <Link to={sectionItem.link}>
                      <span className={styles.sidebar_icon}>
                        <FontAwesomeIcon icon={sectionItem.icon} />
                      </span>
                      <span>{sectionItem.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        } else {
          return (
            <li key={sectionTitle} className={styles.sidebar_section}>
              <div
                className={`${styles.sidebar_item} ${
                  activePath === section[0].link ? styles.active_item : ""
                }`}
              >
                <Link to={section[0].link}>
                  <span className={styles.sidebar_icon}>
                    <FontAwesomeIcon icon={section[0].icon} />
                  </span>
                  <span>{section[0].text}</span>
                </Link>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};
export default Sidebar;
