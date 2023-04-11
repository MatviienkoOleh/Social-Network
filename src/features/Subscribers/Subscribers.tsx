import React, { useEffect, useState } from "react";
import styles from "./Subscribers.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UserView from "../Users/UserView/UserView";
import { UserI } from "../../interface/global";
import { useNavigate } from "react-router";
import { addAnotherUser } from "../AnotherUser/AnotherUserSlice";

export default function Subscribers() {
  const subscribers = useAppSelector((state) => state.profile.subscribers);
  const users = useAppSelector((state) => state.profile.users);
  const anotherUser = useAppSelector((state) => state.anotherUser.anotherUser);
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const updateSubscribers = useAppSelector(
    (state) => state.anotherUser.updateSubscribers
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<any>({
    id: "",
    img: "",
    name: "",
    secondName: "",
    email: "",
    phone: "",
    following: [],
    followers: [],
    wallPosts: [],
  });

  const switchToUser = (user: UserI) => {
    navigate("/AnotherUser");
    dispatch(addAnotherUser(user));
  };

  useEffect(() => {
    if (updateSubscribers === false) {
      setCurrentUser(profileUser);
    } else {
      setCurrentUser(anotherUser);
    }
  }, [updateSubscribers]);

  return (
    <div className={styles.subscribers_Wrapper}>
      <ul className={styles.subscribers_List}>
        {subscribers === "followers"
          ? currentUser.followers
              ?.filter((email: string) => email !== "admin@gmail.com")
              .map((email: string) => {
                let userToRent: UserI | any = users.find(
                  (user: UserI) => user.email === email
                );

                return (
                  <li key={email} onClick={() => switchToUser(userToRent)}>
                    <UserView user={userToRent} />
                  </li>
                );
              })
          : currentUser.following
              ?.filter((email: string) => email !== "admin@gmail.com")
              .map((email: string) => {
                let userToRent: UserI | any = users.find(
                  (user: UserI) => user.email === email
                );

                return (
                  <li key={email} onClick={() => switchToUser(userToRent)}>
                    <UserView user={userToRent} />
                  </li>
                );
              })}
      </ul>
    </div>
  );
}
