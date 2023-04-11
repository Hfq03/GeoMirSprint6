import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     placeMarks: JSON.parse(localStorage.getItem("placemarks")) || [],
//     isMarked: false
// }

export const placeMarkSlice = createSlice({
  name: 'placeMarks',
  initialState: {
      placeMarks: JSON.parse(localStorage.getItem("placemarks")) || [],
      isMarked: false
  },
  reducers: {
        addmark: (state,action) => {
              console.log(action.payload)
              state.placeMarks.push(action.payload)
              state.isMarked=true
        },
        delmark: (state,action) => {
              state.placeMarks = state.placeMarks.filter( placeMark => placeMark.id !== action.payload)
        },
        ismarked: (state,action) => {
            if (state.placeMarks.filter( placemark => placemark.id == action.payload).length > 0) 
                  state.isMarked = true;
            else 
                  state.isMarked = false;
        }
  },
})

// Action creators are generated for each case reducer function
export const { addmark,delmark,ismarked } = placeMarkSlice.actions

export default placeMarkSlice.reducer