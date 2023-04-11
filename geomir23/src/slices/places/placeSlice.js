import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  page: 0,
  isLoading: false,
  add: true,
  error: "",
  postsCount : 0
}

 export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startLoadingPosts: (state) => {
      //console.log("ABA")  
      state.isLoading = true;
    },
    setPosts: (state, action ) => {

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
      setPostsCount: (state,action) => {
        state.postsCount = action.payload
      }
  }
});

export const { startLoadingPosts,setPosts,setAdd,setError,setPostsCount } = postSlice.actions;
export default postSlice.reducer