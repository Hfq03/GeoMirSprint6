import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { PlacesAdd } from "./PlacesAdd";
import { useEffect } from "react";
import { PlaceList } from "./PlaceList";

import { useFetch } from "../hooks/useFetch";

export const PlacesList = () => {
  // { places=[], isLoading, page }



  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);

  let { data, isLoading, error, reRender } = useFetch(
    "/places",
    authToken,
    "GET"
  );

 

  const deletePlace = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch ("https://backend.insjoaquimmir.cat/api/places/"+id,{

          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authToken
          },
          method: "DELETE",

      }
      ).then( data => data.json() )
      .then (resposta => {

              console.log(resposta);
              if (resposta.success == true )
              {
                  console.log("OK")
                  // provoca el refrescat del component i la reexecució de useEffect
                  reRender();

              }
          } )
    }
  };

  return (
    <>
      {!error ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th> */}
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Descripció
                      </th>
                      {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Fitxer                
              </th> */}
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Latitud
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Longitud
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Visibilitat
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Autoria
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Favorits
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        👁️📝
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading
                      ? "En procés de carrega"
                      : data.map((v) => {
                          return (
                            <>
                              {v.visibility.id == 1 ||
                              v.author.email == usuari ? (
                                <PlaceList
                                  deletePlace={deletePlace}
                                  key={v.id}
                                  v={v}
                                />
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="flex w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200 ">
          Carregant...
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
