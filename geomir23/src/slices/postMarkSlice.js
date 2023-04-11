import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postMarks: JSON.parse(localStorage.getItem("postmarks")) || [],
    isMarked: false
}

export const postMarkSlice = createSlice({
  name: 'postMarks',
  initialState,
  reducers: {
        addmark: (state,action) => {
              state.postMarks.push(action.payload)
              state.isMarked=true
        },
        delmark: (state,action) => {
              state.postMarks = state.postMarks.filter( postMark => postMark.id !== action.payload)
        },
        ismarked: (state,action) => {

            if (state.postMarks.filter( postmark => postmark.id == action.payload).length > 0)
                  state.isMarked = true;
            else 
                  state.isMarked = false;
        }
  },
})

// Action creators are generated for each case reducer function
export const { addmark,delmark,ismarked } = postMarkSlice.actions

export default postMarkSlice.reducer