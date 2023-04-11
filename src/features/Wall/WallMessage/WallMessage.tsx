import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { db } from "../../../firebase";
import { NoteI, UserI } from "../../../interface/global";
import Icon from "../Icon/Icon";
import styles from "./WallMessage.module.css";
import { log, profile } from "console";
import {
  clearAnotherUser,
  updateUsersFlag,
} from "../../AnotherUser/AnotherUserSlice";
import { setUsersFromDataBase } from "../../Profile/ProfileSlice";

interface WallMessageProps {
  note: NoteI;
}

export default function WallMessage({ note }: WallMessageProps) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.profile.users);
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const anotherUser = useAppSelector((state) => state.anotherUser.anotherUser);

  useEffect(() => {
    return () => {
      dispatch(clearAnotherUser("clear"));
    };
  }, []);

  const likes = note.likes
    .map((email) => 1)
    .reduce((prev, cur) => prev + cur, 0);
  const dislikes = note.dislikes
    .map((email) => 1)
    .reduce((prev, cur) => prev + cur, 0);

  const like = () => {
    let mainUser: UserI = anotherUser === undefined ? profileUser : anotherUser;

    let likedPost = mainUser.wallPosts.map((post: NoteI) => {
      if (post.id === note.id) {
        //Is were Liked before
        let isUserLiked;
        post.likes.forEach((email) => {
          isUserLiked = email === profileUser.email;
        });

        //Delete or add like
        if (isUserLiked) {
          let deletedLike = post.likes.filter(
            (email) => email !== profileUser.email
          );
          let obj = {
            ...post,
            likes: [...deletedLike],
          };
          return obj;
        } else {
          let newLikes = [...post.likes, profileUser.email];
          let obj = {
            ...post,
            likes: [...newLikes],
          };
          return obj;
        }
      }
      return post;
    });
    let currentUser = {
      ...mainUser,
      wallPosts: {
        ...mainUser.wallPosts,
        ...likedPost,
      },
    };
    let newUsersArray = users.map((user) => {
      if (user.email === currentUser.email) {
        return currentUser;
      }
      return user;
    });

    //update Data Base
    const referenceToDb = db.ref(db.dataBase, "users");
    db.update(referenceToDb, {
      ...newUsersArray,
    });

    //Update State
    dispatch(updateUsersFlag(false));
  };
  const dislike = () => {
    let mainUser: UserI = anotherUser === undefined ? profileUser : anotherUser;

    let dislikePost = mainUser.wallPosts.map((post: NoteI) => {
      if (post.id === note.id) {
        //Is were Disliked before
        let isUserDisliked;
        post.dislikes.forEach((email) => {
          isUserDisliked = email === profileUser.email;
        });

        //Delete or add Dislike
        if (isUserDisliked) {
          let deletedLike = post.dislikes.filter(
            (email) => email !== profileUser.email
          );
          let obj = {
            ...post,
            dislikes: [...deletedLike],
          };
          return obj;
        } else {
          let newLikes = [...post.dislikes, profileUser.email];
          let obj = {
            ...post,
            dislikes: [...newLikes],
          };
          return obj;
        }
      }
      return post;
    });
    let currentUser = {
      ...mainUser,
      wallPosts: {
        ...mainUser.wallPosts,
        ...dislikePost,
      },
    };
    let newUsersArray = users.map((user) => {
      if (user.email === currentUser.email) {
        return currentUser;
      }
      return user;
    });

    //update Data Base
    const referenceToDb = db.ref(db.dataBase, "users");
    db.update(referenceToDb, {
      ...newUsersArray,
    });

    //Update State
    dispatch(updateUsersFlag(false));
  };
  const deleteNote = (message: string) => {
    // copy wallPosts and delete note
    let filteredWallPosts = [...profileUser.wallPosts].filter(
      (post: NoteI) => post.message !== message
    );
    //updateProfileUser
    let copyProfileUser = { ...profileUser, wallPosts: [...filteredWallPosts] };
    console.log(copyProfileUser);
    // update all users
    const copyUsers = [...users].map((user: UserI) => {
      if (user.email === copyProfileUser.email) {
        return copyProfileUser;
      }
      return user;
    });
    //update data base firebase
    let referenceToDb = db.ref(db.dataBase, "users");
    db.update(referenceToDb, {
      ...copyUsers,
    });
  };

  return (
    <div className={styles.note_Wrapper}>
      <div className={styles.note_Message}>{note.message}</div>
      <div className={styles.note_Icons}>
        <span className={styles.note_Icons_Block} onClick={() => like()}>
          <Icon name="like" height={20} width={20} fill={"black"} />
          {likes}
        </span>
        <span className={styles.note_Icons_Block} onClick={() => dislike()}>
          <Icon name="disLike" height={20} width={20} fill={"black"} />
          {dislikes}
        </span>
        {anotherUser === undefined ? (
          <span
            className={styles.note_Icons_Block}
            onClick={() => deleteNote(note.message)}
          >
            <Icon name="close" height={18} width={18} fill={"black"} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
