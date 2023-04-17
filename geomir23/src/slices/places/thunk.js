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
        let url = "";
        const filter = getState().places.filter;
        console.log("entra: "+filter.description,filter.author)

        dispatch(setisLoading(true));
        if (filter.description == ""&&filter.author == "") {
            url =
                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?pagina=1&page=" + page

                    : "https://backend.insjoaquimmir.cat/api/places";
        }else if (!filter.author == ""&&filter.description == ""){
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?pagina=1&page=" + page + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/places?author=" + filter.author;
        } else if (!filter.author == ""&&!filter.description == ""){
            console.log("entra al bueno")
            url =

            page > 0

                ? "https://backend.insjoaquimmir.cat/api/places?pagina=1&page=" + page + "&description=" + filter.description+"&author="+ filter.author

                : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description+"&author=" + filter.author;;
        }
        else if (filter.author == ""&&!filter.description == ""){
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?pagina=1&page=" + page + "&description=" + filter.description

                    : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description;
        }

        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        // const url = "https://backend.insjoaquimmir.cat/api/places"
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            if (page > 0) {
                dispatch(setPlaces(resposta.data.collection));

                dispatch(setPages(resposta.data.links));

                console.log(resposta.data.links);

            } else {

                dispatch(setPlaces(resposta.data));

            }
            dispatch(setisLoading(false));
            // dispatch(setPlaces(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
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