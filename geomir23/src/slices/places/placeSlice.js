import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    places: [],
    place: {
    name: "",
    description: "",
    file: { filepath: "" },
    author: { name: "" },
    latitude: 0,
    longitude: 0,
    visibility:0,
    },
    favorites_count: 0,
    favorited: true,
    page: 0,
    isLoading: false,
    error: "",
    info: "",    
};

export const placeSlice = createSlice({

    name: "place",

    initialState,

    reducers: {

        setisSaving: (state,action) => {
            state.isSaving = action.payload;
        },
        setisLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setPlace: (state,action) => {
            state.place = action.payload
        },
        setPlaces: (state,action) => {
            state.places = action.payload
        },
        setFavorite: (state, action) => {
            state.favorited = action.payload
        },
        setPage: (state,action) => {
            state.page = action.payload
        },
        setPages: (state,action) => {
            state.pages = action.payload
        },
        setFilter: (state,action) => {
            state.filter = action.payload
        }
    }
});

export const { startLoadingPlace,setPlaces,setPlace,setAdd,setError,setPlacesCount,setPage,setFilter,setPlaceCount } = placeSlice.actions;
export default placeSlice.reducer