import React from "react";
import { useEffect } from "react";
import { Review } from "./Review";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { ReviewAdd } from "./ReviewAdd";
import { ReviewsContext } from "./reviewsContext";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../slices/reviews/thunks";
import { setReviewsCount } from "../../slices/reviews/reviewSlice";
// Fem servir un context únicament dins de tots els components de Reviews

export const ReviewsList = ({ id, reviews_count }) => {
  
  let { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { reviews = [], page=0, isLoading=true, add=true, error="", reviewsCount=0 } = useSelector((state) => state.reviews);
  
  useEffect(() => {
    dispatch(setReviewsCount(reviews_count))
    dispatch(getReviews(0, id, authToken,email));
  }, []);

  

  return (
    
    <>
      {add ? <ReviewAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mb-4 max-w-lg">
        {reviewsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha reviews
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {reviewsCount} {reviewsCount > 1 ? " ressenyes" : " ressenya"}{" "}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
          {error}
        </div>
      ) : (
        <></>
      )}

      {reviews.map((v) => {
        return <Review key={v.id} review={v} />;
      })}

</>
  );
};
