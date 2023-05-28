import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useContext } from "react";
import { delPlace } from "../slices/places/thunks";
import { useDispatch } from "react-redux";

export const PlaceList = ({place}) => {    
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    const dispatch = useDispatch();

    return(
        <>
            <td>{place.id}</td>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.file.id}</td>
            <td>{place.latitude}</td>
            <td>{place.longitude}</td>
            <td>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td>{place.favorites_count}</td>
                <td><Link to={"/places/"+place.id} title="Veure"><i className="bi bi-eye-fill"></i></Link></td>
            {usuari == place.author.email &&
                <td><Link to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link></td> 
            }
            {usuari == place.author.email &&
                <td><button onClick={(e) => {dispatch(delPlace(place.id, authToken));}} title="Eliminar" type="submit"><i className="bi bi-trash3"></i></button></td>
            }
        </>
    )
}

export default PlaceList