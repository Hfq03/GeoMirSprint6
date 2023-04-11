import React, { useContext } from "react";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo } from "../slices/todosSlice";
import { db } from "../firebase";
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";

import {
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { UserContext } from "../userContext";
//import { todosReducer } from "./todosReducer";

// Estat inicial del reducer. Buit
// const initialState = [

// ];
// const init = ()=> {
//   // Si localstorage tornes null tornariem un array buit
//   return JSON.parse(localStorage.getItem("todos")) || []
// }

export const ToDos = () => {
  //const [todos, dispatchTodos] = useReducer(todosReducer, initialState,init);


  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const todosCollectionRef =collection(db,"todos")

  const synchronize = async () => {
    // Obtenim tots els todos per adesprés esobrrar-los
    const dades = await getDocs(todosCollectionRef);
    // Esborrem tots els todos
    // aquest sistema no es recomana en entorn web,
    // però no hi ha un altra opció
    dades.docs.map((v) => {
      deleteDoc(doc(db, "todos", v.id));
    });
    // Afegim tots els todos de nou
    todos.map((p) => {
      addDoc(todosCollectionRef, {
        id: p.id,
        description: p.description,
        done: p.done,
        user: p.user
      });
    });
  };

  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // const handleNewToDo = (todo)=> {

  //   console.log("Afegeixo")
  //   console.log({todo})

  //   const action = {
  //     type: 'Add Todo',
  //     payload: todo
  //   }
  //   dispatchTodos(action)

  // }

  // const handleDeleteToDo = (id) => {

  //   console.log("AQui arribo "+id)
  //   dispatchTodos({
  //     type: 'Del Todo',
  //     payload: id
  //   })
  // }

  // const handleToggleTodo = (id) => {

  //   dispatchTodos({
  //     type: 'Toggle Todo',
  //     payload: id
  //   })

  // }

  return (
    <>
      <button
        onClick={synchronize}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-600 hover:text-white hover:bg-red-500"
      >
        Sync
      </button>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          {/* <ToDoAdd handle={handleNewToDo}/> */}
          <ToDoAdd />
          <div>
            {todos.length == 0 ? (
              <div>Vago! Treballa, afegeix alguna cosa a fer !!</div>
            ) : (
              <></>
            )}
            {todos.map((todo) => (
              // <ToDo key={todo.id} todo={ todo } handleDelete={handleDeleteToDo} handleToggleTodo={handleToggleTodo } />
              <ToDo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
