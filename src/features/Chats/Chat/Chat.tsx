import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useForm } from "react-hook-form";
import { ChatI, MessageI, UserI } from "../../../interface/global";
import { db } from "../../../firebase";
import { updateUsersFlag } from "../../AnotherUser/AnotherUserSlice";

export default function Chat() {
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const chatEmail = useAppSelector((state) => state.chat.email);
  const users = useAppSelector((state) => state.profile.users);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = (data: MessageI) => {
    //create copyProfile chats
    let copyChats = [...profileUser.chats];
    // Check is chat exist 
    let is = copyChats.find((chat) => chat.email === chatEmail);
    if (is === undefined) {
      let newChat = {
        email: chatEmail,
        chat: [
          {
            email: profileUser.email,
            message: data.message,
          },
        ],
      };
      copyChats.push(newChat);
    } else {
      copyChats = copyChats.map((chat) => {
        if (chat.email === chatEmail) {
          let copyChat = {
            ...chat,
            chat: [
              ...chat.chat,
              {
                email: profileUser.email,
                message: data.message,
              },
            ],
          };
          return copyChat;
        }
        return chat;
      });
    };
    //update ProfileUser
    let copyProfileUser = {
      ...profileUser,
      chats: [...copyChats],
    };
    //create copyAnotherUser chats
    let findAnotherUser: any = users.find((user) => user.email === chatEmail);
    let copyAnotherUserChats = [...findAnotherUser.chats];
    // Check is chat exit in anotherUser
    let isAnother = copyAnotherUserChats.find((chat: any) => chat.email === profileUser.email);
    if (isAnother === undefined) {
      let newChat = {
        email: profileUser.email,
        chat: [
          {
            email: profileUser.email,
            message: data.message,
          },
        ],
      };
      copyAnotherUserChats.push(newChat);
    } else {
      copyAnotherUserChats = copyAnotherUserChats.map((chat) => {
        if (chat.email === profileUser.email) {
          let copyChat = {
            ...chat,
            chat: [
              ...chat.chat,
              {
                email: profileUser.email,
                message: data.message,
              },
            ],
          };
          return copyChat;
        }
        return chat;
      });
    };
    // update AnotherUserProfile
    let copyAnotherUser = {
      ...findAnotherUser,
      chats: [...copyAnotherUserChats],
    };
    // update all users
    let copyUsers = users.map((user: UserI) => {
      if (user.email === copyProfileUser.email) {
        return copyProfileUser;
      } else if (user.email === copyAnotherUser.email) {
        return copyAnotherUser;
      }
      return user;
    });
    //update all users in DB
    let reference = db.ref(db.dataBase, "users");
    db.update(reference, {
      ...copyUsers,
    });
    //rerender
    dispatch(updateUsersFlag(false));
  };

  return (
    <div className={styles.chat_wrapper}>
      <ul className={styles.chat_list}>
        {profileUser.chats
          .find((chat: any) => chat.email === chatEmail)
          ?.chat.map((message: ChatI, index: number) => {
            return (
              <li
                className={styles.chat_list_item}
                key={index}
                style={
                  message.email === profileUser.email
                    ? { justifyContent: "flex-end" }
                    : { justifyContent: "flex-start" }
                }
              >
                <span className={styles.chat_list_message}>
                  {message.message}
                </span>
              </li>
            );
          })}
      </ul>
      <form className={styles.chat_form} onSubmit={handleSubmit(sendMessage)}>
        <input
          {...register("message", { required: true })}
          className={styles.chat_form_input}
        />
        <button className={styles.chat_form_button}>Send message</button>
      </form>
    </div>
  );
}
