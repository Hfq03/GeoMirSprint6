import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../slices/places/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PlacesAdd() {
  let { authToken, setAuthToken } = useContext(UserContext);
  const { error="", success="" } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
  const onSubmit = data => dispatch(sendPlace(data));

  const sendPlace = async (data) => {
    const file = data.upload[0];
    const tiposArchivos = ["image/gif", "image/jpg", "image/png", "image/jpeg", "video/mp4"];
    if (! tiposArchivos.includes(file.type)) {
      setError('upload', {type: 'filetype', message:"Tipo de archivo incorrecto, solo acepta GIF, JPG, PNG, JPEG y MP4"})
    }else if(file.size > 2048000){
      setError('upload', {type: 'filesize', message:"El archivo no puede pesar mas de 2048KB"})
    }else{
      const data2 = { ...data, upload: data.upload[0]}
      dispatch(addPlace(data2, authToken, navigate));
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (pos)=> {
      setValue('latitude', pos.coords.latitude)
      setValue('longitude', pos.coords.longitude)
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
  }, [])

  return <div>
            {success ? <div>{success}</div> : <></>}
            <h1>PlaceAdd</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input {...register("name", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 4,
                      message: "El Nombre tiene que contener mínimo 4 caracteres"
                    },
                    maxLength: {
                      value: 255,
                      message: "El Nombre no puede contener más de 255 caracteres"
                    }})} type="text" placeholder=" " id="name"/>
                <label htmlFor="name">Nombre</label>
                <div></div>
                <p>Nombre no válido</p>
              </div>
              {errors.name ? <div >{errors.name.message}</div> : <></>}
              <div>
                <input {...register("description", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 4,
                      message: "La descripción tiene que contener mínimo 4 caracteres"
                    },
                    maxLength: {
                      value: 255,
                      message: "La descripción no puede contener más de 255 caracteres"
                    }})} type="text" placeholder=" " id="description"/>
                <label htmlFor="description">Descripción</label>
                <div></div>
                <p>Descripción no válido</p>
              </div>
              {errors.description ? <div>{errors.description.message}</div> : <></>}
              <div>
                <input {...register("upload", {required: "Este campo es obligatorio",})} type="file" placeholder=" " id="upload"/>
                <label htmlFor="upload">Archivo</label>
                <div></div>
                <p>Archivo no válida</p>
              </div>
              {errors.upload ? <div>{errors.upload.message}</div> : <></>}
              <div>
                <input {...register("latitude", {required: "Este campo es obligatorio",})} type="number" placeholder=" " id="latitude" step={"any"}/>
                <label htmlFor="latitude">Latitud</label>
                <div></div>
                <p>Latitud no válida</p>
              </div>
              {errors.latitude ? <div>{errors.latitude.message}</div> : <></>}
              <div>
                <input {...register("longitude", {required: "Este campo es obligatorio",})} type="number" placeholder=" " id="longitude" step={"any"}/>
                <label htmlFor="longitude">Longitud</label>
                <div></div>
                <p>Longitud no válido</p>
              </div>
              {errors.longitude ? <div>{errors.longitude.message}</div> : <></>}
              <div>
                <select {...register("visibility", {required: "Este campo es obligatorio",})} step={"any"} id="visibility">
                  <option value="1" >Public</option>
                  <option value="3" >Private</option>
                  <option value="2" >Contacts</option>
                </select>
                <label htmlFor="visibility">Visibilidad</label>
                
                <div></div>
                <p>Visibilidad no válida</p>
              </div>
              {errors.visibility ? <div>{errors.visibility.message}</div> : <></>}
              {error ? <div>{error}</div> : <></>}
              <div>
                <button className='boton' type="submit">Crear place</button>
                <button className='boton' type='reset'>Reiniciar</button>
                <Link className='boton' to={"/places"}>Volver</Link>
              </div>
            </form>
          </div>;
  }