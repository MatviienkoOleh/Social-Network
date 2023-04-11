import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Wall.module.css";
import WallForm from "./WallForm/WallForm";
import WallMessage from "./WallMessage/WallMessage";
import { NoteI, UserI } from "../../interface/global";

interface WallProps {
  anotherUser?: UserI;
}

export default function Wall({ anotherUser }: WallProps) {
  const users = useAppSelector((state) => state.profile.users);
  const profileUser = useAppSelector((state) => state.profile.profileUser);
 
  return (
    <main className={styles.wall_Wrapper}>
      {anotherUser ? null : <WallForm />}
      <section>
        {users
          .find(
            (user: UserI) =>
              user.email ===
              (anotherUser ? anotherUser.email : profileUser.email)
          )
          ?.wallPosts.filter((note: NoteI) => note.message !== 'first post').map((note: NoteI) => {
            return (
              <div key={note.id}>
                <WallMessage note={note} />
              </div>
            );
          })}
      </section>
    </main>
  );
}
