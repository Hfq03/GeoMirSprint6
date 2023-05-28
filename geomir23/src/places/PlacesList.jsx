import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import PlaceList from './PlaceList';
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../slices/places/thunks";

export default function PlacesList() {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { places, page=0, isLoading=true, error="", filter } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaces(0, authToken));
  }, [filter]);

  return(
    <>
      {isLoading ? 
        <p>Loading...</p>
      : error?.message || (
        <div>
          <h1>Places</h1>
          <div>
            <table>
                <thead>
                    <tr>
                        <th><h1>ID</h1></th>
                        <th><h1>Nom</h1></th>
                        <th><h1>Descripció</h1></th>
                        <th><h1>Fitxer</h1></th>
                        <th><h1>Latitud</h1></th>
                        <th><h1>Longitud</h1></th>
                        <th><h1>Visibilitat</h1></th>
                        <th><h1>Autor</h1></th>
                        <th><h1>Favorits</h1></th>
                        <th colSpan="3"><h1>Accions</h1></th>
                    </tr>
                </thead>
                <tbody>   
                  {places.map((place) => (  
                    (place.visibility.name == 'public' || usuari == place.author.email) && 
                    (<tr key={place.id}><PlaceList place={place}/></tr>) 
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}