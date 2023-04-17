import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { addReview } from '../../slices/reviews/thunks';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
export const ReviewAdd = () => {
   const dispatch = useDispatch();
   let { authToken, setAuthToken,usuari, setUsuari} = useContext(UserContext);
   const { reviews = [], page = 0, isLoading = true, reviewCreada = false, error = "", reviewsCount = 0 } = useSelector((state) => state.reviews);
   const { id } = useParams();
   const { formState, onInputChange,OnResetForm} = useForm({
    review: "",
    });
  const {review} = formState 
  const formData = new FormData;
  formData.append("review", review);
  
return (
  <div>
      <label for="review">Review</label>
      <textarea name="review" value={review} onChange={onInputChange} className="form-control"></textarea>
      <button className="btn btn-primary" onClick={(e) => {
         dispatch(addReview(authToken,formData,id));
      }}>Add Review</button>
      <button className="btn btn-primary" onClick={OnResetForm}>Reset</button>
      {error? (<div>{error}</div>):(<></>) }        
  </div>
)
}

// export default ReviewAdd