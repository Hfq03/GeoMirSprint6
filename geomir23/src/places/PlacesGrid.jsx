import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import PlaceGrid from './PlaceGrid';
import Paginate from './Paginate';
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../slices/places/thunks";

export default function PlacesGrid() {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { places, page=0, isLoading=true, error="", filter } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaces(page, authToken));
  }, [page, filter]);

  return(
    <>
      {isLoading ? 
        <p>Loading...</p>
      : error?.message || (
        <div>
          <Paginate />
          <div className="posts">
              {places.map((place) => (  
                  (place.visibility.name == 'public' || usuari == place.author.email) && 
                  (<div key={place.id}><PlaceGrid place={place}/></div>) 
              ))} 
          </div>
          <Paginate />
        </div>
      )}
    </>
  );
}