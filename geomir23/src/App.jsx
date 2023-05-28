import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from 'react'
import LoginRegister  from './auth/LoginRegister';
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";
// import About from "./About";
import PlacesList from "./places/PlacesList";
import Place from "./places/Place";
import PlacesAdd from "./places/PlacesAdd";
import PlacesEdit from "./places/PlacesEdit";
import PlacesGrid from "./places/PlacesGrid";
import PlacesMenu from "./places/PlacesMenu";

import ToDos from "./todos/ToDos";
import PlaceMarks from "./places/placeMarks";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addtodostate, resetState } from "./slices/todoSlice";
import { addmark, resetPlaceMarks } from "./slices/places/placeMarkSlice";


export default function App() {
  
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  let [idUsuari, setIdUsuari] = useState("");
  // const todosCollection = collection(db, "ToDos");
  const placeMarksCollection = collection(db, "markPlaces");
  const dispatch = useDispatch();
  // const getTodos = async () => {
  //   dispatch(resetState());
  //   const dades = await getDocs(todosCollection);
  //   dades.docs.map((v) => {
  //     dispatch(addtodo(v.data()))
  //   });
  // };
  const getTodos = async () => {
    dispatch(resetState());
    const q = query(collection(db, "ToDos"), where("user", "==", usuari));
    const dades = await getDocs(q);
    let ids = [];
    dades.forEach((v) => {
      if (!ids.includes(v.id)){
        dispatch (addtodostate(v.data()))
        ids.push(v.id)
      }
    })
  }
  const getPlaceMarks = async () => {
    dispatch(resetPlaceMarks());
    let ids = [];
    const dades = await getDocs(placeMarksCollection);
    dades.docs.map((v) => {
      if (!ids.includes(v.id)){
        dispatch(addmark(v.data()))
        ids.push(v.id)
      }
    });
  };
  
  useEffect(() => {
    getTodos();
    getPlaceMarks();
  }, [usuari]);

  return (
    <>
      <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken, idUsuari, setIdUsuari }}>
        {authToken ? (
          <>
            <Routes>
              <Route path="/" element={<> <PlacesMenu/> <PlacesList /> </>} />
              <Route path="/places" element={<> <PlacesMenu/><PlacesList/> </>} />
              <Route path="/places/add" element={<> <PlacesMenu/><PlacesAdd/> </>} />
              <Route path="/places/grid" element={<> <PlacesMenu/><PlacesGrid /> </>} />
              <Route path="/places/:id" element={<> <PlacesMenu/><Place/> </>} />
              <Route path="/places/edit/:id" element={<> <PlacesMenu/><PlacesEdit/> </>} />
              {/* <Route path="/places/:id/reviews" element={<> <PlacesMenu/><ReviewsList/> </>} /> */}
              <Route path="/todos" element={<> <ToDos/> </>} />
              <Route path="/places/marks" element={<> <PlacesMenu/><PlaceMarks/> </>} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}