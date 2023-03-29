import React from "react";
import { NoteI } from "../../../interface/global";
import Icon from "../Icon/Icon";
import styles from "./WallMessage.module.css";

interface WallMessageProps {
  note: NoteI;
}

export default function WallMessage({ note }: WallMessageProps) {
  const likes = note.likes
    .map((email) => 1)
    .reduce((prev, cur) => prev + cur, 0);
  const dislikes = note.dislikes
    .map((email) => 1)
    .reduce((prev, cur) => prev + cur, 0);

  return (
    <div className={styles.note_Wrapper}>
      <div className={styles.note_Message}>{note.message}</div>
      <div className={styles.note_Icons}>
        <span className={styles.note_Icons_Block}><Icon name='like' height={20} width={20} fill={'black'} />{likes}</span>
        <span className={styles.note_Icons_Block}><Icon name='disLike' height={20} width={20} fill={'black'} />{dislikes}</span>
      </div>
    </div>
  );
}
