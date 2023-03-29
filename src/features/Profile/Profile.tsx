import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authState, db } from "../../firebase";
import Icon from "../Wall/Icon/Icon";
import styles from "./Profile.module.css";
import { setUsersFromDataBase } from "./ProfileSlice";

export default function Profile() {
  const profileUser = useAppSelector((state) => state.profile.profileUser);

  const firstName =
    profileUser?.name[0].toUpperCase() + profileUser?.name.slice(1);
  const secondName =
    profileUser?.secondName[0].toUpperCase() + profileUser?.secondName.slice(1);

  return (
    <div className={styles.profile_Wrapper}>
      <div className={styles.profile_Settings_Icon}>
        <Icon height={30} width={30} fill={"black"} name={"settings"} />
      </div>
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
          className={[styles.profile_List_item, styles.profile_Buttons].join(
            " "
          )}
        >
          Followers
        </li>
        <li
          className={[styles.profile_List_item, styles.profile_Buttons].join(
            " "
          )}
        >
          Following
        </li>
      </ul>
    </div>
  );
}
