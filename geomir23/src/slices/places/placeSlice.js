import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  page: 0,
  isLoading: false,
  add: true,
  error: "",
  postsCount : 0
}

 export const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    startLoadingPlaces: (state) => {
      //console.log("ABA")  
      state.isLoading = true;
    },
    setPlaces: (state, action ) => {

      state.reviews= action.payload
      state.isLoading=false
     
      },
      setAdd: (state,action) => 
      {
        state.add = action.payload
      },
      setError: (state,action) => {

        state.error = action.payload
      },
      setPlacesCount: (state,action) => {
        state.postsCount = action.payload
      }
  }
});

export const { startLoadingPlaces,setlaces,setAdd,setError,setPlacesCount } = placeSlice.actions;
export default placeSlice.reducer