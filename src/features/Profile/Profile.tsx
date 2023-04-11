import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Icon from "../Wall/Icon/Icon";
import styles from "./Profile.module.css";
import { setSubscribers } from "./ProfileSlice";
import { setUpdateSubscribers } from "../AnotherUser/AnotherUserSlice";

export default function Profile() {
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const dispatch = useAppDispatch();

  const firstName =
    profileUser?.name[0].toUpperCase() + profileUser?.name.slice(1);
  const secondName =
    profileUser?.secondName[0].toUpperCase() + profileUser?.secondName.slice(1);
  const followersCount = profileUser?.followers
    .filter((email: string) => email !== "admin@gmail.com")
    .map((element: string) => 1)
    .reduce((prev: number, cur: number) => prev + cur, 0);
  const followingCount = profileUser?.following
    .filter((email: string) => email !== "admin@gmail.com")
    .map((element: string) => 1)
    .reduce((prev: number, cur: number) => prev + cur, 0);

  const navigateCurrentUser = (text: string) => {
    if (text === "followers") {
      dispatch(setSubscribers("followers"));
      dispatch(setUpdateSubscribers(false));
    } else if (text === "following") {
      dispatch(setSubscribers("following"));
      dispatch(setUpdateSubscribers(false));
    }
  };

  return (
    <div className={styles.profile_Wrapper}>
      <Link className={styles.profile_Settings_Icon} to="profileSettings">
        <Icon height={30} width={30} fill={"black"} name={"settings"} />
      </Link>
      <img
        className={styles.profile_Photo}
        src={profileUser.img}
        alt="profile_Photo"
      />
      <ul className={styles.profile_List}>
        <li
          className={[styles.profile_List_item, styles.profile_Name].join(" ")}
        >
          {firstName + " " + secondName}
        </li>
        <li
          className={[styles.profile_List_item, styles.profile_Email].join(" ")}
        >
          {profileUser?.email}
        </li>
        <li className={styles.profile_List_item}>{profileUser?.phone}</li>
        <li
          onClick={() => navigateCurrentUser("followers")}
          className={[styles.profile_List_item, styles.profile_Buttons].join(
            " "
          )}
        >
          <Link className={styles.profile_List_Item_Link} to="/Subscribers">
            Followers {followersCount}
          </Link>
        </li>
        <li
          onClick={() => navigateCurrentUser("following")}
          className={[styles.profile_List_item, styles.profile_Buttons].join(
            " "
          )}
        >
          <Link className={styles.profile_List_Item_Link} to="/Subscribers">
            Following {followingCount}
          </Link>
        </li>
        <li
          className={[styles.profile_List_item, styles.profile_Buttons].join(
            " "
          )}
        >
          <Link className={styles.profile_List_Item_Link} to="/Chats">
            Chats
          </Link>
        </li>
      </ul>
    </div>
  );
}
