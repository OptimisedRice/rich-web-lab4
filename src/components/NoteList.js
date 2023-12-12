import React from 'react';
import Note from "./Note";
import styles from "../styles/NoteList.module.css"
const NoteList = ({data, onDelete, onEdit}) => {
  return (
    <div className={styles.container}>
      {data.map((note) => {
          return <Note data={note}
                       onDelete={() => onDelete(note.id)}
                       onEdit={onEdit}
                       key={note.id}/>
      })}
    </div>
  );
};

export default NoteList;