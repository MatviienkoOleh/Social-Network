import React from "react";
import styles from "./Users.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UserView from "./UserView/UserView";
import { useNavigate } from "react-router";
import { addAnotherUser } from "../AnotherUser/AnotherUserSlice";
import { UserI } from "../../interface/global";

export default function Users() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.profile.users);
  const profileUser = useAppSelector(state=> state.profile.profileUser);

  const switchToUser = (user: UserI) => {
    navigation("/AnotherUser");
    dispatch(addAnotherUser(user));
  };

  return (
    <div className={styles.users_Wrapper}>
      <ul className={styles.users_List}>
        {users
          .filter((user: UserI) => user.email !== "admin@gmail.com" && user.email !== profileUser.email)
          .map((user: UserI) => {
            return (
              <li key={user.email} onClick={() => switchToUser(user)}>
                <UserView user={user} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
