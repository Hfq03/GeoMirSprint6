import React from 'react';
import { UserContext } from "../../userContext";
import { useContext } from "react";
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from "react-redux";
import spanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { delReview } from "../../slices/places/reviews/thunks";

export const Review = ({ review }) => {
    const { usuari,setUsuari, authToken, setAuthToken } = useContext(UserContext);
    const { reviews = [], page=0, isLoading=true, add=true, error="", reviewsCount=0 } =
    useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    const formatter = buildFormatter(spanishStrings);
    return(
        <>
            <div>
                <div>
                    <img src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif" alt="" />
                </div>
                <div>
                    <div>
                        <h6>{review.user.name}</h6>
                        <span><TimeAgo date={review.created_at} formatter={formatter} /></span>
                        {usuari == review.user.email &&
                            <button onClick={(e) => {dispatch(delReview(review,authToken));}} title="Eliminar" type="submit"><i className="bi bi-trash3"></i></button>
                        }
                    </div>
                    <div>
                        {review.review}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review