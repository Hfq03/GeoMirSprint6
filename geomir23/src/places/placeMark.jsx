import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

export const placeMark = ({ mark, delmark }) => {
  const dispatch = useDispatch();
  return (
    
    <>
    <td>{mark.name}</td>
    <td>{mark.description}</td>
    <td><Link to={mark.ruta} title="Veure"><i className="bi bi-eye-fill"></i></Link></td>
    <td><button onClick={() => dispatch(delmark(mark.ruta))}><i className="bi bi-trash3-fill"></i></button></td> 
    </>
  );
};

export default placeMark