import React, { useContext } from "react";
import { UserContext } from "../../userContext";
// import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../slices/places/reviews/thunks";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export const ReviewAdd = ({id}) => { 
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  // const { reviews=[], page=0, isLoading=true, add=true, error="", reviewsCount=0 } = useSelector((state) => state.reviews);
  // const { formState, onInputChange, onResetForm } = useForm({
  //   review: "",
  // });  
  // const {review} = formState;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => dispatch(addReview(id,data,authToken));

  return <div>
          {/* {success ? <div className="success">{success}</div> : <></>} */}
          <h1>Add Review</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* <input className="material-form__input" type="text" placeholder=" " id="review" name="review" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{2,100}" maxLength="100" onChange={(e) => {onInputChange(e);}}/> */}
              <input {...register("review", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 20,
                      message: "La review tiene que tener mínimo 20 caracteres y tres palabras"
                    },
                    maxLength: {
                      value: 200,
                      message: "La review tiene que tener máximo 200 caracteres"
                    },
                    pattern: {
                      value: /^(?=(\b\w+\b\s?){3,})(?!\s).+$/,
                      message: "La review tiene que contener mínimo 3 palabras" 
                    }})} type="text" placeholder=" " id="review"/>
              <label htmlFor="review">Review</label>
              <br/>
              <p>Review no válida</p>
            </div>
            {errors.review ? <div>{errors.review.message}</div> : <></>}
            <div>
              <button type="submit" className="boton">Crear review</button>
              <button className="boton" type='reset'>Reiniciar</button>
              <Link to={"/places"} className="boton">Volver</Link>
            </div>
          </form>
        </div>;
}
export default ReviewAdd