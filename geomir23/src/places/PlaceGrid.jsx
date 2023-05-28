import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useContext } from "react";
import { delPlace } from "../slices/places/thunks";
import { useDispatch } from "react-redux";

export const PlaceGrid = ({place}) => {    
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    const dispatch = useDispatch();

    return(
        <>
            <div>
                <div>
                    {usuari == place.author.email &&
                    <div>
                        <Link to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                        <button onClick={(e) => {dispatch(delPlace(place.id, authToken));}} title="Eliminar" type="submit"><i className="bi bi-trash3"></i></button>
                    </div>}
                </div>
                <div>
                    <h5>{ place.name }</h5>
                </div>
            </div>
            <div>
                <Link to={"/places/"+place.id} title="Veure"><img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}/></Link>
            </div>
            <div>
                <p>{ place.favorites_count } favs</p>
                <p>{ place.description }</p>
            </div>
            <br/>
            <br/>
        </>
    )
}

export default PlaceGrid