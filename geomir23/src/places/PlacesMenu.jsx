import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../userContext';
import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/places/placeSlice';

export default function PlaceMenu(){
    const dispatch = useDispatch();
    const { formState, onInputChange, onResetForm } = useForm({
      search: "",
    });  
    let { idUsuari } = useContext(UserContext);
    const { filter } = useSelector((state) => state.places);
    const { search } = formState;
    return <div>
              <div>
                <Link to="/places/add" className='boton'>Afegir Entrada</Link>
                <Link to="/places/grid" className='boton'>Grid</Link>
                <Link to="/places" className='boton'>List</Link>
                <Link to="/places/marks" className='boton'>Marks</Link>
              </div>
              <div>
                <form>
                  <input type="text" placeholder="Search..." name="search" value={search} onChange={onInputChange}/>
                  <button title={"Buscar"} onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,description:search}));}}><i className="bi bi-search"></i></button>
                  <button title={"Mis Places"} onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,author:idUsuari}));}}><i className="bi bi-person"></i></button>
                  <button title={"Reiniciar"}  onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,author:"",description:""})), onResetForm()}}><i className="bi bi-arrow-clockwise"></i></button>
                </form>
              </div>  
            </div>;
}