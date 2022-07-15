import { useState, useEffect, useRef  } from "react";//definimos el estado inicial, regresa arreglo de dos elementos(getter, setter)
import lottie from "lottie-web"; 
import Todo from "./todo"; 
import EmojiPickerInput from "./inputt/emojiPicker/emojiPickerInput"

import "./todoApp.css";

export default function TodoApp() {
  const [title, setTitle] = useState({
    title: "",
    description: ""
  });//(getter, setter)
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const container = useRef(null);

    useEffect(() => {
        
              lottie.loadAnimation({
                container: container.current, // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                autoplay: true,
                // path: 'data.json', // the path to the animation json
                animationData:require('../imagen.json')
            });
     
    }, []);

  function handleInputChange(e) {
    // e.target.value? setTitle(a) : 
    // console.log("soy e", e)
    setTitle({
      ...title,
      [e.target.name] : e.target.value
    })
  }
  function handleInputChange2(e) {
    setTitle({
      ...title,
      [e.current.name] : e.current.value
    })
      // setTitle(e.target.value)
  }

  function handleSubmit(e) {
    // console.log("soy eff", e)
    const date = new Date().toString();
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: title.title,
      description:title.description,
      completed: false,
      date: date,
    };

    const oldTodos = [...todos];
    oldTodos.unshift(newTodo);

    setTodos(oldTodos);
    setTitle({
      title: "",
      description: ""
    });
    e.target.value = " ";
    
  }

  function handleDelete(id) {
    const tempTodos = todos.filter((item) => item.id !== id);

    setTodos([...tempTodos]);
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value.title;
    item.description = value.description;
    setTodos([...temp]);
  }

  function handleCheckboxChange(id, status) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = status;
    // console.log(item);
    // console.log("Holis");
    setTodos([...temp]);
  }

  return (
    <div className="todoContainer">
      
      <div className="contitle">
        <h1 className="title" >ToDoList</h1>
      </div>
      
      <div className="subCabeza">
        <div className={"container"} ref={container}></div>
        <EmojiPickerInput 
            handleInputChange2={handleInputChange2}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            title={title}
          />
        {/* <form onSubmit={handleSubmit} className="todoCreateForm">
          <input
            onChange={handleInputChange}
            value={title}
            className="todoInput"
          />
          <input value="Create todo" type={"submit"} className="buttonCreate" />
        </form> */}
      </div >

      <div className="todosContainer">
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onComplete={handleCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}
