import React, {useEffect, useRef, useState} from 'react';
import styles from "../styles/Note.module.css"
const Note = ({data, onDelete, onEdit}) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(data.text);
  const [colour, setColour] = useState("");
  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState(undefined);
  const [location, setLocation] = useState({
    x: Math.random()*(window.innerWidth*0.8),
    y: Math.random()*((window.innerHeight - (window.innerHeight*0.15))*0.8)
  })

  const refContainer = useRef();

  const colours = ["orange", "turquoise", "deeppink", "greenyellow"]
  useEffect(() => {
    let randomColor = Math.floor(Math.random()*4);
    setColour(colours[randomColor]);

    if(data.image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result)
      }

      reader.readAsDataURL(data.image);
    }
  }, []);
  const handleEdit = () => {
    setEdit(true);
  }

  const handleConfirm = () => {
    setEdit(false);
    onEdit(data.id, content);
  }

  const updateContent = (e) => {
    setContent(e.target.value);
  }

  const handleDrag = () => {
    setDrag(!drag);
  }

  const handleRelease = () => {
    if(drag) {
      setDrag(false)
    }
  }

  const handleMove = (e) => {
    if(drag) {
      setLocation({
        x: e.clientX -(refContainer.current.offsetWidth/2),
        y: e.clientY - (refContainer.current.offsetHeight*0.15)
      })
    }
  }

  const changeColor = (e) => {
    console.log(e.button)
    if(e.button === 2) {
      const index = colours.findIndex(item => {
        return item === colour;
      });
      console.log("test", index)
      index === colours.length - 1 ? setColour(colours[0]) : setColour(colours[index + 1])
    }
  }
  return (
    <div className={styles.container}
         style={{backgroundColor: colour, top: location.y, left: location.x}}
         onMouseMove={handleMove}
         onMouseDown={changeColor}
         onClick={handleRelease}
         onContextMenu={(e)=> e.preventDefault()}
          ref={refContainer}>

      <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <div className={styles.buttons}>
          {edit ? <button onClick={handleConfirm} className={styles.confirm}>✅</button> :
            <button onClick={handleEdit} className={styles.edit}>✏️</button>}
          <div className={styles.pin}
               style={{cursor: drag ? "grabbing": "grab"}}
               onClick={handleDrag}>
            <div style={{paddingBottom: "100%"}}/>
          </div>
          <button onClick={onDelete} className={styles.delete}>X</button>
        </div>
      </div>
      {edit ? <textarea onChange={updateContent} style={{resize: "vertical"}} value={content}/>: <p>{content}</p>}
      {image && <img src={image} alt={"note_image"}/>}
    </div>
  );
};

export default Note;