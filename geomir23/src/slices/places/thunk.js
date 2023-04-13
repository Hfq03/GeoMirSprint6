import { setAdd, setError, setPlace, setPlaceCount, startLoadingPlace } from "./placeSlice";

export const getPlaces = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {

        dispatch(startLoadingPlace());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) 
        {
            dispatch(setPlace(resposta.data));
        }
        else {
            dispatch (setError(resposta.message));
        }

        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                dispatch (setAdd(false));
                console.log("Te place");
            }
        });
       
};
}

export const deletePlace = (place, authToken) => {
    return async (dispatch, getState) => {


        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" +
              place.id +
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
    
          console.log(resposta);
          if (resposta.success == true) {
            dispatch (setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch (getPlaces(0,place.id,authToken))
            const state = getState()
            dispatch (setPlaceCount(state.placeCount - 1));
          }


    };
};
export const addPlace = (authToken, formData, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" +
              id + 
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
                body: formData
              }
          );
          const resposta = await data.json();
    
          console.log(resposta);
          if (resposta.success == true) {
            dispatch (setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch (getPlaces(0,id,authToken))
            //const state = getState()
            //dispatch (setPlaceCount(state.placeCount - 1));
          }else{
              dispatch(setEffect(resposta.message))
          }
    };
};