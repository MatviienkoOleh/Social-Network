import React from "react";
import styles from "./AnotherUserHeader.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { setSubscribers } from "../../Profile/ProfileSlice";
import { setUpdateSubscribers, updateUsersFlag } from "../AnotherUserSlice";
import { db } from "../../../firebase";
import { setChat, setEmail } from "../../Chats/Chat/ChatSlice";
import { ChatFormDbI } from "../../../interface/global";
import { log } from "console";

export default function AnotherUserHeader() {
  const anotherUser = useAppSelector((state) => state.anotherUser.anotherUser);
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const users = useAppSelector((state) => state.profile.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const anotherUserName = anotherUser
    ? anotherUser?.name[0].toUpperCase() +
      anotherUser.name.slice(1) +
      " " +
      anotherUser?.secondName[0].toUpperCase() +
      anotherUser?.secondName.slice(1)
    : null;

  const followersCount = anotherUser?.followers
    .filter((email: string) => email !== "admin@gmail.com")
    .map((element: string) => 1)
    .reduce((prev: number, cur: number) => prev + cur, 0);

  const followingCount = anotherUser?.following
    .filter((email: string) => email !== "admin@gmail.com")
    .map((element: string) => 1)
    .reduce((prev: number, cur: number) => prev + cur, 0);

  const isFollowed = anotherUser?.followers.findIndex(
    (email: string) => email === profileUser.email
  );

  const navigateCurrentUser = (text: string) => {
    if (text === "followers") {
      dispatch(setSubscribers("followers"));
      dispatch(setUpdateSubscribers(true));
    } else if (text === "following") {
      dispatch(setSubscribers("following"));
      dispatch(setUpdateSubscribers(true));
    }
  };
  const followByUser = (e: any) => {
    const isInFollowers = anotherUser?.followers.findIndex(
      (email: string) => email === profileUser.email
    );
    if (isInFollowers === -1) {
      //update allUsers from redux

      // updateAnotherUser
      let copyAnotherUser = {
        ...anotherUser,
        followers: [...anotherUser?.followers, profileUser.email],
      };

      // update profileUser
      let copyProfileUser = {
        ...profileUser,
        following: [...profileUser?.following, anotherUser.email],
      };

      // update users all
      let newUser = users.map((user) => {
        if (user.email === anotherUser.email) {
          return copyAnotherUser;
        }
        if (user.email === profileUser.email) {
          return copyProfileUser;
        }
        return user;
      });
      // //subscribe to a use, follow
      const referenceToDb = db.ref(db.dataBase, "users");
      db.update(referenceToDb, {
        ...newUser,
      });

      //rerender
      dispatch(updateUsersFlag(false));
    } else {
      let copyAnotherUser = {
        ...anotherUser,
        followers: [...anotherUser?.followers],
      };
      let newUserFollowers = copyAnotherUser.followers.filter(
        (email: string) => email !== profileUser.email
      );
      copyAnotherUser = {
        ...anotherUser,
        followers: [...newUserFollowers],
      };
      // update profileUser
      let copyProfileUser = {
        ...profileUser,
        following: [...profileUser?.following],
      };
      let newProfileUserFollowers = copyProfileUser.following.filter(
        (email: string) => email !== anotherUser.email
      );
      copyProfileUser = {
        ...profileUser,
        following: [...newProfileUserFollowers],
      };
      let newUser = users.map((user) => {
        if (user.email === anotherUser.email) {
          return copyAnotherUser;
        }
        if (user.email === profileUser.email) {
          return copyProfileUser;
        }
        return user;
      });
      // //subscribe to a use, follow
      const referenceToDb = db.ref(db.dataBase, "users");
      db.update(referenceToDb, {
        ...newUser,
      });
      //rerender
      dispatch(updateUsersFlag(false));
    }
  };
  const navigateToChat = (email: string) => {
    dispatch(setEmail(email));
    navigate(`/Chat/${email}`);
  };

  return (
    <header className={styles.anotherUser_Header}>
      <img
        className={styles.anotherUser_Img}
        src={anotherUser?.img}
        alt="photo"
      />
      <div className={styles.anotherUser_Info_Block}>
        <div className={styles.anotherUser_Info}>
          <span className={styles.anotherUser_Name}>{anotherUserName}</span>
          <span className={styles.anotherUser_Email}>{anotherUser?.email}</span>
          <span className={styles.anotherUser_Email}>{anotherUser?.phone}</span>
        </div>
        <div className={styles.anotherUser_Buttons}>
          <span
            className={styles.anotherUser_Button}
            onClick={() => navigateCurrentUser("followers")}
          >
            <Link
              className={styles.anotherUser_Buttons_Links}
              to="/Subscribers"
            >
              Followers {followersCount}
            </Link>
          </span>
          <span
            className={styles.anotherUser_Button}
            onClick={() => navigateCurrentUser("following")}
          >
            <Link
              className={styles.anotherUser_Buttons_Links}
              to="/Subscribers"
            >
              Following {followingCount}
            </Link>
          </span>
          <div
            className={styles.anotherUser_Button}
            onClick={() => navigateToChat(anotherUser.email)}
          >
            <span className={styles.anotherUser_Buttons_Links}>Chat</span>
          </div>

          {isFollowed === -1 ? (
            <span
              className={styles.anotherUser_Button}
              onClick={(e) => followByUser(e)}
            >
              Follow
            </span>
          ) : (
            <span
              className={styles.anotherUser_Button}
              onClick={(e) => followByUser(e)}
            >
              un Follow
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
