import React, { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { UserContext } from "../../userContext";

export const PlaceMarksAdd = ({ handle }) => {

  // let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  const { formState, onInputChange, onResetForm } = useForm({
    note: "",
  });

  const { mark } = formState

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (mark.length <= 1) return;

    const newMark = {
      id: new Date().getTime(),
      mark: mark,
      // user: usuari
    };

    onResetForm();
    handle(newMark);
  };

  return (
    <div className="mb-4">
      <h1 className="text-grey-darkest">Todo List</h1>
      <form onSubmit={onFormSubmit} className="flex mt-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800"
          placeholder="Què farem avui?"
          name="note"
          value={mark}
          onChange={onInputChange}
        />
        <input
          type="submit"
          onClick={handle}
          value="Add"
          className="flex-no-shrink p-2 border-2 rounded text-teal-400 border-teal-600 hover:text-white hover:bg-teal-500"
        />
      </form>
    </div>
  );
};
