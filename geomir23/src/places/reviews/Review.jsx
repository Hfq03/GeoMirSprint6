import React from "react";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import { ReviewsContext } from "./reviewsContext";

import TimeAgo from "react-timeago";
import catStrings from "react-timeago/lib/language-strings/ca";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useDispatch, useSelector } from "react-redux";
import { delReview } from "../../slices/reviews/thunks";

export const Review = ({ review }) => {
 const { usuari, email,setUsuari, authToken, setAuthToken } = useContext(UserContext);
 const { reviews = [], page=0, isLoading=true, add=true, error="", reviewsCount=0 } = useSelector((state) => state.reviews);
 const dispatch = useDispatch();

  const formatter = buildFormatter(catStrings);

  

  return (
    <div class="px-10">
      <div class="bg-white max-w-xl rounded-2xl px-10 py-8  hover:shadow-2xl transition duration-500">
        <div class="mt-4">
          <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
            Review de {review.user.name}
          </h1>
        
          <p class="mt-4 text-md text-gray-600">{review.review}</p>
          <div class="flex justify-between items-center">
            <div class="mt-4 flex items-center space-x-4 py-6">
              <div class="text-sm font-semibold">
                <span class="font-normal">
                  <TimeAgo
                    date={review.created_at}
                    formatter={formatter}
                  ></TimeAgo>{" "}
                </span>
              </div>
            </div>
            {review.user.email === email ? (
              <>
                <button
                  onClick={(e) => dispatch( delReview(review,authToken))}
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Esborrar
                </button>

                {/* <a href="#" className=" w-max text-cyan-600" onClick={ (e)=> deletePlace(review.id,e) }> Esborrar</a> */}
              </>
            ) : (
              <></>
            )}
            {/* <div class="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">+</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
