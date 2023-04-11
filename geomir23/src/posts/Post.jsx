import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import { Marker, Popup, MapContainer, TileLayer, useMap } from "react-leaflet";
import { PostsMenu } from "./PostsMenu";
import { CommentAdd } from "./comments/CommentAdd";
import { CommentsList } from "./comments/CommentsList";
import { useDispatch, useSelector } from "react-redux";
import { addmark, ismarked } from "../slices/postMarkSlice";
// import { MarkerLayer, Marker } from "react-leaflet-marker";


// const initialState = [];

// const init = () => {
//   // Si localstorage tornes null tornariem un array buit
//   return JSON.parse(localStorage.getItem("postmarks")) || [];
// };

export const Post = () => {

  const { id } = useParams();
  console.log("el id el id el id "+id)

  const { postMarks,isMarked } = useSelector(state => state.postMarks)
  //const { isMarked } = useSelector(state => state.isMarked)

  const dispatch = useDispatch();

  const { pathname } = useLocation();


  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  let [post, setPost] = useState({});

  // place és un objecte, amb ojctes interns (place.file.filepath, per exemple)
  // Quan llegim amb fetch aquest triga un estona en obtenir les dades
  // i al renderitzar amb aquest objecte buit, dona error
  // i l 'aplicació peta i ja no es torna a renderitzar quan places
  // té el valor correcte
  // Emprem isLoading, per rendertizar només quan ja s'ha carregat el place
  let [isLoading, setIsLoading] = useState(true);
  let [liked, setLiked] = useState(false);
  let [likes, setLikes] = useState(0);


  const anotaPost = () => {
    //e.preventDefault()
    
    const dada = {
      id: post.id,
      name: post.id,
      description: post.body,
      route: pathname,
    };

    dispatch(addmark( dada))
    //setMarked(true)
    console.log(dada);

    // const action = { 
    //   type: "AddMark",
    //   payload: dada,
    // };
    //dispatchMarks(action);
    // executarem un note add
  };

  const test_mark = (id) =>{


    console.log(postMarks.filter( postmark => postmark.id == id))

    if (postMarks.filter( postmark => postmark.id == id).length > 0)
        return true
    else 
      return false 

  }

  const unlike = async () => {
    setLiked(false);
    console.log("Not Liked");
    const data = await fetch(
      "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      }
    );
    const resposta = await data.json();
    if (resposta.success == true) {
      setLiked(false);
      setLikes(likes - 1);
    }
  };
  const like = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
        }
      );
      const resposta = await data.json();

      if (resposta.success == true) {
        setLiked(true);
        setLikes(likes + 1);
      } else {
        setLiked(false);
        console.log("Epp, algo ha passat ");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const test_like = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
        }
      );
      const resposta = await data.json();

      console.log(resposta);
      if (resposta.success == true) {
        setLiked(false);
        console.log("Not Liked");
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
          }
        );
        const resposta = await data.json();
      } else {
        setLiked(true);
        console.log("Liked");
      }
    } catch (e) {
      console.log("oeoeoeoe");
      console.log(e);
    }
  };
  const getPost = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "GET",
        }
      );
      const resposta = await data.json();

      // Faria falta control·lar possible error

      console.log(resposta.data);
      // En aquest punt omplim l'array,  resposta. data
      // no és un array, és un objecte retornat per l'api
      // per tant, hem de crear un array, d'un sol element
      // per a que el .map del jsx pugui iterar l'únic
      // element
      setPost(resposta.data);
      setLikes(resposta.data.likes_count);
      console.log(resposta.data.likes_count);
      console.log(post);
      // Ara podem dir que ja s'ha carregat place i es pot renderitzar
      setIsLoading(false);

      // Actualitzem la vble d'estat places
      //setPlaces(resposta.data);
      // Canvia el valor de refresca
      // provocarà que entri a useEffect
      // al fer el rendertizat
      //setRefresca(false);
    } catch (e) {
      console.log(e);
    }
  };
  // Sempre necessari, o al actualitzar l'state torna a executar-ho i entra
  // en bucle

  useEffect(() => {
    //console.log("Aqui estoy");
    //console.log(stateMarks)
    localStorage.setItem("postmarks", JSON.stringify(postMarks));


  }, [postMarks]);

  useEffect(() => {
    getPost();
    test_like();
    console.log("ghghghghghhgghgh "+id) 
    dispatch(ismarked(id))
  }, []);

  const position = [43.92853, 2.14255];

  const deletePost = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((resposta) => {
          console.log(resposta);
          if (resposta.success == true) {
            console.log("OK");
            // provoca el refrescat del component i la reexecució de useEffect
            setRefresca(true);
          }
        });
    }
  };

  return (
    <>
      {/* PlacesShow { id } */}

      {/* Només es renderitza quan isLoading es false */}
      {isLoading ? (
        "Espera...."
      ) : (
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
              <img
                src={
                  "https://backend.insjoaquimmir.cat/storage/" +
                  post.file.filepath
                }
                alt=""
                className=" col-span-1 w-200 h-96 items-center"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">
              <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
                {post.name}
              </h2>
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {post.author.name}
              </span>
              <span className="self-center   px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
                Latitud: {post.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                Longitud: {post.longitude}
              </span>

              <div className="bg-orange-100 py-3 text-x2 font-semibold">
                Descripció
              </div>
              <p className=" bg-yellow-100">{post.body}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
                {/* <MapContainer  style={{ height: 280 }} center={[43.92853, 2.14255]} zoom={12} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[43.92853, 2.14255]}>
    <Popup>
       { position }. 
    </Popup>
  </Marker>
</MapContainer> */}

                {post.author.email === usuari ? (
                  <>
                    <Link
                      to={"/posts/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => deletePost(id, e)}
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
                 { !isMarked ? (<button
                  className="bg-blue-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  onClick={(e) => anotaPost(e)}
                >
                  DESA
                </button>) : (<button
                  className="bg-blue-200 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                >
                  DESAT
                </button>)}

                {liked ? (
                  <a
                    href="#"
                    onClick={(e) => unlike(id, e)}
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    - 👍 {likes}
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => like(id, e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    + 👍 {likes}
                  </a>
                )}

                {/* <ReviewAdd id={place.id}/> */}
                <CommentsList
                  id={post.id}
                  comments_count={post.comments_count}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
