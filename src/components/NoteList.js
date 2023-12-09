import React from 'react';
import Note from "./Note";

const NoteList = ({data, onDelete, onEdit}) => {

  return (
    <div style={styles.container}>
      {data.map((note, index) => {
          return <Note text={note.text} id={note.id}
                       onDelete={() => onDelete(note.id)}
                       onEdit={onEdit}
                       key={index}/>
      })}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  }
}
export default NoteList;