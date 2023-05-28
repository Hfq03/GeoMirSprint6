import React, { useReducer } from 'react';
import { UserContext } from "../userContext";
import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addmark, delmark, compmark } from "../slices/places/placeMarkSlice";
import { db } from "../firebase";
import { doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";
import ReviewsList from "./Reviews/ReviewsList";
import { getPlace, delPlace, favorite, unfavorite, comprobarFavorito } from "../slices/places/thunks";

export default function Place() {
  const { pathname } = useLocation()
  let navigate = useNavigate();
  const { id } = useParams();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { place, page=0, isLoading=true, error="", favorito } = useSelector((state) => state.places);

  const { marks, isMarked } = useSelector((state) => state.marks);
  const dispatch = useDispatch();

  const placeMarksCollection = collection(db, "markPlaces");
  const synchronize = async () => {
    const dades = await getDocs(placeMarksCollection);
    dades.docs.map((v) => {
      deleteDoc(doc(db, "markPlaces", v.id));
    });
    marks.map((p) => {
      addDoc(placeMarksCollection, {
        idplace: p.idplace,
        name: p.name,
        description: p.description,
        ruta: p.ruta,
      });
    });
  };

  useEffect(() => {
    synchronize();
    dispatch(compmark(pathname));
  }, [marks]);

  useEffect(()=>{
    dispatch(comprobarFavorito(id, authToken));
  }, []);

  useEffect(()=>{
    dispatch(getPlace(id, authToken));
  }, [favorito]);

  const handle = (name, description) => {
    console.log("Afegeixo marca al place amb ID "+id);
    if (description.length <= 1) return;
    const newMark = {
      idplace: id,
      name: name,
      description: description,
      ruta: pathname
    };
    console.log("Abans del dispatch");
    dispatch(addmark(newMark));
    // setMarked(true);
  };

  const deletePlace = async () => {
    dispatch(delPlace(place.id, authToken));
    navigate("/places");
  }

  return(
    <>
      {isLoading ? 
        <div>
          <p>Loading...</p>
        </div>
      : error?.message || ( 
        <div>
          <div className="posts">
            <div>
              <div>
                  <div>
                      {usuari == place.author.email &&
                      <div>
                          <Link to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                          <button onClick={(e) => {deletePlace(place.id, authToken);}} title="Eliminar" type="submit"><i className="bi bi-trash3"></i></button>
                      </div>}
                  </div>
                  <div>
                      <h5>{ place.name }</h5>
                  </div>
              </div>
              <div>
                  <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}/>
              </div>
              <div>
                  <div>
                    {favorito ? (
                      <button onClick={(e) => {dispatch(unfavorite(place.id, authToken));}}><i className="bi bi-star-fill"></i></button>
                    ) : (
                      <button onClick={(e) => {dispatch(favorite(place.id, authToken));}}><i className="bi bi-star"></i></button>
                    )}
                  </div>
                  <div>
                    {isMarked ? (
                      <button onClick={() => dispatch(delmark(pathname))} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468', cursor:'pointer'}} className="bi bi-bookmark-check-fill"></i></button>
                    ) : (
                      <button onClick={() => handle(place.name,place.description)} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468', cursor:'pointer'}} className="bi bi-bookmark"></i></button>
                    )}
                  </div>
              </div>
              <div>
                  <p>{ place.favorites_count } favs</p>
                  <p>{ place.description }</p>
              </div>
              <div>
                  <div>
                    <p></p>
                  </div>
              </div>
              <p>{ place.reviews_count } Reviews</p>
              <div>
                  <p>Latitude: { place.latitude }</p>
                  <p>Longitude: { place.longitude }</p>
              </div>
            </div> 
          </div>
          <div style={{ width: '100%'}}>
            <ReviewsList id={id} reviews_count={place.reviews_count} />
          </div>
        </div>
      )}
    </>
  );
}