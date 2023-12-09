import React, {useState} from 'react';

const Note = ({text, id, onDelete, onEdit}) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(text);
  const handleEdit = () => {
    setEdit(true);
  }

  const handleConfirm = () => {
    setEdit(false);
    onEdit(id, content);
  }

  const updateContent = (e) => {
    setContent(e.target.value);
  }
  return (
    <div style={styles.container}>
      <h3>{"Note " + id}</h3>
      {edit ? <textarea onChange={updateContent}>{content}</textarea> : <p>{content}</p>}
      {edit ? <button onClick={handleConfirm}>Confirm</button> :
        <button onClick={handleEdit}>Edit</button>}

      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

const styles = {
  container: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    padding: 10,
    margin: 20,
    width: "20vw",
  }
}
export default Note;