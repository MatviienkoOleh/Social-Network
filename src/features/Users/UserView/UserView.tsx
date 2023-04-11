import React from "react";
import styles from "./UserView.module.css";
import { UserI } from "../../../interface/global";

interface UserViewProps {
  user: UserI;
}

export default function UserView({ user }: UserViewProps) {
  const userName =
    user.name[0].toUpperCase() +
    user.name.slice(1) +
    " " +
    user.secondName[0].toUpperCase() +
    user.secondName.slice(1);

  return (
    <div className={styles.userView}>
      <img className={styles.userView_Img} src={user.img} alt="photo" />
      <div className={styles.userView_Info}>
        <span className={styles.userView_Info_Name}>{userName}</span>
        <span className={styles.userView_Info_Email}>{user.email}</span>
      </div>
    </div>
  );
}
