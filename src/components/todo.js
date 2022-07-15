import { useState , useRef } from "react";
import EmojiPicker from "./inputt/emojiPicker/emojiPicker";

import "./todoApp.css";

export default function Todo({ item, onUpdate, onComplete, onDelete }) {
  const inRef = useRef(null)
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item ?? "");
  // console.log("soy isEdit", isEdit)
// console.log("soy item",item);
// console.log("soy value",value);
  function handleChange(e) {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    });
  }

  function handleUpdate() {
    // e.preventDefault();
    onUpdate(item.id, value);
    console.log("soy value2", value);
    setIsEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleCheckboxChange(e) {
    onComplete(item.id, e.target.checked);
    // console.log(e.target.checked);
  }
  function handleInputChange2(e) {
    setValue({
      ...value,
      [e.current.name] : e.current.value
    })
      // setTitle(e.target.value)
  }

  return (
    <div className="todo">
      {isEdit ? (
        <div className="mitodo">
          <EmojiPicker  handleInputChange2={handleInputChange2} ref={inRef}/>

          <form onSubmit={handleSubmit} className="todoUpdateForm">
             <input
              className="todoInput"
              name={"description"}
              type="text"
              value={value.description}
              onChange={handleChange}
              ref={inRef}
            /><input
              className="todoInput"
              name={"title"}
              type="text"
              value={value.title}
              onChange={handleChange}
            />
           
            <input className="button" type="submit" value="Update"/>
            {/* <button className="button" onClick={handleUpdate}>
              Update
            </button> */}
          </form>
        </div>
      ) : (
        <div className="todoInfo">
          <input
            type={"checkbox"}
            onChange={handleCheckboxChange}
            checked={item.checked}
          />
          <div className="divSpan">

            <span
              className="todoTitle"
              style={{
                color: item.completed ? "#ccc" : "",
                textDecoration: item.completed ? "line-through" : "",
              }}
            >
              {item.title}
            </span>
            <span
              className="descrip"
              style={{
                color: item.completed ? "#ccc" : "",
                textDecoration: item.completed ? "line-through" : "",
              }}
            >
              {item.description}
            </span>
          </div>
          <span
            className="date"
            style={{
              color: item.completed ? "#ccc" : "",
              textDecoration: item.completed ? "line-through" : "",
            }}
          >
            {item.date}
          </span>
          <>
            <button className="button" onClick={() => setIsEdit(true)}>
              Edit
            </button>
            <button className="buttonDelete" onClick={() => onDelete(item.id)}>
              Update
            </button>
          </>
        </div>
      )}
    </div>
  );
}
