
// import useForm from "../hooks/useForm";
import useForm from "../hooks/useForm";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo } from "../slices/todoSlice";
import { UserContext } from '../userContext';

export function ToDoAdd() {   
  const { formState, onInputChange, onResetForm } = useForm({
    description: ""
  });
  const { description } = formState;
  const dispatch = useDispatch();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (description.length <= 1) return;
    const newTodo = {
      id: new Date().getTime(),
      description: description,
      user: usuari,
      done: false
    };
    onResetForm();
    //handle(newTodo)
    dispatch(addtodo(newTodo));
  };

  return (
    <div>
      <form onSubmit={(e) => {onFormSubmit(e);}}>
        <h1 style={{fontSize: '1.5em',}}>ADD TODOS</h1>
        <div>
          <input value={description} type="text" placeholder="" name="description" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{4,140}" minLength="4" maxLength="140" onChange={(e) => {onInputChange(e);}}/>
          <label htmlFor="description">Descripción todo</label>
          <div></div>
          <p>Descripción no válida</p>
        </div>
        <div>
          <button type="submit" className="boton">Crear ToDo</button>
          <button className="boton" type="reset" onClick={onResetForm}>Reiniciar</button>
        </div>
        <br></br>
      </form>
    </div>
  );
};

