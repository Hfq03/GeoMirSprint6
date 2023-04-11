import { useState } from "react";

export const useForm = (initialForm={}) => {
  let [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    // amb { target }  desestructurem e
    // enlloc d'escriure e.target , escriurem target

    // Desestructurem ara target
    const { name, value } = target;

    setFormState({
      ...formState,
      // [target.name] : target.value
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return { ...formState, formState,onInputChange,onResetForm};
};
