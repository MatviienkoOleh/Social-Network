import React, { useState } from "react";
import styles from "./WallForm.module.css";
import { useForm } from "react-hook-form";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../app/hooks";
import { NoteI } from "../../../interface/global";

type FormI = {
  message: string;
};

export default function WallForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormI>({
    defaultValues: {
      message: "",
    },
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const users = useAppSelector((state) => state.profile.users);
  const profileUser = useAppSelector((state) => state.profile.profileUser);

  const onSubmit = (data: FormI, event: any) => {
    event.preventDefault();
    if (data.message.length >= 5) {
      setIsDisabled(true);
      
      //Create new Message
      let newMessage: NoteI = {
        id: "" + new Date(),
        message: "" + data.message,
        dislikes: ["admin@gmail.com"],
        likes: ["admin@gmail.com"],
      };

      //Add new post
      let changedUsers = users.map((user) => {
        if (user.email === profileUser.email) {
          let changedPostUser = {
            ...user,
            wallPosts: [...user.wallPosts, newMessage],
          };
          return changedPostUser;
        }
        return user;
      });

      // Update data base with new post!
      let referenceToPosts = db.ref(db.dataBase, 'users')
      db.update(referenceToPosts, {
        ...changedUsers
      })

      //Make button disabled for 3 seconds
      setTimeout(() => {
        setIsDisabled(false);
      }, 3000);

      //Reset the form
      reset();
    } else {
      alert("The Message Input should not be empty.");
    }
  };

  return (
    <form className={styles.wall_Form} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("message", {
          minLength: {
            value: 5,
            message: "Length more that 5.",
          },
        })}
        type="text"
        placeholder="Type Message..."
        className={styles.wall_Input}
      />
      <button disabled={isDisabled} className={styles.wall_Button}>
        Make note
      </button>
    </form>
  );
}
