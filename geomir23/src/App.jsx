import reactLogo from "./assets/react.svg";
import "./App.css";
import { LoginRegister } from "./auth/LoginRegister";
import { useEffect, useState } from "react";
//import { createContext } from 'react'

import { UserContext } from "./userContext";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Places } from "./places/Places";
import { PlacesShow } from "./places/PlacesShow";
import { About } from "./components/aplicacio/About";
import { NotFound } from "./components/aplicacio/NotFound";
import { PlaceEdit } from "./places/PlaceEdit";
import { PlacesAdd } from "./places/PlacesAdd";
import { PlacesMenu } from "./places/PlacesMenu";
import { PlaceGrid } from "./places/PlaceGrid";
import { PlacesGrid } from "./places/PlacesGrid";
import { PlacesList } from "./places/PlacesList";
import { Posts } from "./posts/Posts";
import { PostsMenu } from "./posts/PostsMenu";
import { PostsList } from "./posts/PostsList";
import { PostsGrid } from "./posts/PostsGrid";
import { PostsAdd } from "./posts/PostsAdd";
import { Post } from "./posts/Post";
import { ToDos } from "./notes/ToDos";
import { PlaceMarks } from "./places/placemark/PlaceMarks";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { addtodo } from "./slices/todosSlice";
import { PostMarks } from "./posts/postmark/PostMarks";
// "leaflet": "^1.9.3",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-leaflet": "^4.2.0",
//     "react-leaflet-marker": "^2.1.0",
//     "react-router-dom": "^6.4.3"

function App() {
  let [usuari, setUsuari] = useState("");
  let [authToken, setAuthToken] = useState("");
  let [email, setEmail] = useState("");

  const markCollectionRef = collection(db, "placemarks");
  const postCollectionRef = collection(db, "postmarks");

  const todosCollectionRef = collection(db, "todos");


  const dispatch = useDispatch();

  const getTodos = async () => {
    //const dades = await getDocs(todosCollectionRef);

    

    const desar = [];

    const q = query(collection(db, "todos"), where("user", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    //desar.push(doc.data());
    console.log("ABCDEFGHIJK")
    console.log(doc.data())
    dispatch (addtodo(doc.data()))

    })

    
    // dades.docs.map((v) => {
    //   console.warn(v.data());
    //   desar.push(v.data());
    // });

    //console.log("BBBBBBBBBBBBBBBB")
    //console.log(desar)
    //localStorage.setItem("todos",JSON.stringify(desar))
    //console.log(desar);
    //console.log(JSON.stringify(desar))
  };
  // const getMarks = async () => {
  //   const dades = await getDocs(markCollectionRef);
  //   const dadesP = await getDocs(postCollectionRef);

  //   const desar = [];
  //   const desarP = []

  //   dades.docs.map((v) => {
  //     console.warn(v.data());
  //     desar.push(v.data());
  //   });



  //   dadesP.docs.map((v) => {
  //     console.warn(v.data());
  //     desarP.push(v.data());
  //   });
  //   //console.log("AAAAAAAAAAAAAAAAAA")
  //   //console.log(desar);
  //   //localStorage.setItem("placemarks",JSON.stringify(desar))


  //   // setTasques(dades.docs.map ((v) => {
  //   //   return {...v.data(),id:v.id}
  //   // }) )
  // };

  useEffect(() => {
    getTodos();
    // getMarks();

  }, [email]);

  return (
    <>
      <UserContext.Provider
        value={{ usuari, setUsuari, authToken, setAuthToken, email, setEmail }}
      >
        {authToken != "" ? (
          <>
            <Header />

            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Places />} />
              <Route path="/places" element={<Places />} />
              <Route
                path="/places/marks/"
                element={
                  <>
                    <PlacesMenu />
                    <PlaceMarks />
                  </>
                }
              />
              <Route
                path="/places/list"
                element={
                  <>
                    <PlacesMenu />
                    <PlacesList />
                  </>
                }
              />
              <Route
                path="/places/grid"
                element={
                  <>
                    <PlacesMenu />
                    <PlacesGrid />
                  </>
                }
              />
              <Route
                path="/places/add"
                element={
                  <>
                    <PlacesMenu />
                    <PlacesAdd />
                  </>
                }
              />
              <Route
                path="/places/edit/:id"
                element={
                  <>
                    <PlacesMenu />
                    <PlaceEdit />
                  </>
                }
              />
              <Route
                path="/places/:id"
                element={
                  <>
                    <PlacesMenu />
                    <PlacesShow />
                  </>
                }
              />

              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/marks/" element={<><PostsMenu /><PostMarks /></>} />

              <Route
                path="/posts/list"
                element={
                  <>
                    <PostsMenu />
                    <PostsList />
                  </>
                }
              />
              <Route
                path="/posts/grid"
                element={
                  <>
                    <PostsMenu />
                    <PostsGrid />
                  </>
                }
              />
              <Route
                path="/posts/add"
                element={
                  <>
                    <PostsMenu />
                    <PostsAdd />
                  </>
                }
              />
              <Route
                path="/posts/edit/:id"
                element={
                  <>
                    <PlacesMenu />
                    <PlaceEdit />
                  </>
                }
              />
              <Route
                path="/posts/:id"
                element={
                  <>
                    <PostsMenu />
                    <Post />
                  </>
                }
              />

              <Route path="/todos/" element={<ToDos />} />

              {/* <Route path="/posts" element={ <Places />} />
            <Route path="/posts/:id" element={<PlacesShow />} /> */}
              <Route path="/about" element={<About />} />
            </Routes>

            {/* <Footer/> */}
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>

      {/* <LoginRegister/> */}
    </>
  );
}

export default App;
