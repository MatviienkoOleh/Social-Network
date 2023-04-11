import React from "react";
import styles from "./Chats.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UserView from "../Users/UserView/UserView";
import { useNavigate } from "react-router";
import { setChat, setEmail } from "./Chat/ChatSlice";
import { ChatFormDbI, UserI } from "../../interface/global";

export default function Chats() {
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const users = useAppSelector((state) => state.profile.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToChat = (chat: ChatFormDbI) => {
    navigate(`/Chat/${chat.email}`);
    dispatch(setEmail(chat.email));
    dispatch(setChat(chat.chat));
  };

  return (
    <ul className={styles.chat_Wrapper}>
      {profileUser.chats.filter((chat: ChatFormDbI) => chat.email !== 'admin@gmail.com').map((chat: ChatFormDbI) => {
        let user: UserI | any = users.find((user: UserI) => user.email === chat.email);

        return (
          <li key={chat.email} onClick={() => navigateToChat(chat)}>
            <UserView user={user} />
          </li>
        );
      })}
    </ul>
  );
}
