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
export const addPlace = (authToken, formData, navigate) => {
  return async (dispatch, getState) => {
    dispatch(setisSaving(true))

    // dispatch(startLoadingReviews());
    const headers = {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
        },
        method: "POST",
        body: formData
    };

    const url = "https://backend.insjoaquimmir.cat/api/places"

    const data = await fetch(url, headers);

    const resposta = await data.json();

    if (resposta.success == true) {
        console.log("place creado: " + resposta.data)
        dispatch(setisSaving(false))

        // dispatch(setPlaces(resposta.data));
        navigate("/places/" + resposta.data.id)

    }

    else {
        console.log(resposta)
        dispatch(setError(resposta.message));

    }
  };
};