import { profile } from "console";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Wall.module.css";
import WallForm from "./WallForm/WallForm";
import WallMessage from "./WallMessage/WallMessage";

const array = [
  {
    id: "1",
    message:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, voluptatibus quae dolorum blanditiis odio eum praesentium voluptatem odit totam reiciendis in! Voluptatum nisi in soluta asperiores alias minima iusto eius!",
    likes: ["Lena@gmail.com", "dima@gmail.com"],
    dislikes: ["karina@gmail.com"],
  },
  {
    id: "2",
    message: "Some new Message",
    likes: ["Lena@gmail.com", "dima@gmail.com"],
    dislikes: ["karina@gmail.com"],
  },
  {
    id: "3",
    message: "Some new Message",
    likes: ["Lena@gmail.com", "dima@gmail.com"],
    dislikes: ["karina@gmail.com"],
  },
];

export default function Wall() {
  const users = useAppSelector((state) => state.profile.users);
  const profileUser = useAppSelector((state) => state.profile.profileUser);

  return (
    <main className={styles.wall_Wrapper}>
      <WallForm />
      <section>
        {users
          .find((user) => user.email === profileUser.email)
          ?.wallPosts.map((note) => {
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
