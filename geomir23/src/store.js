import { configureStore } from '@reduxjs/toolkit'
import placeMarkSlice from './slices/placeMarkSlice'
import postMarkSlice from './slices/postMarkSlice'
import todosSlice from './slices/todosSlice'
import reviewSlice from './slices/reviews/reviewSlice'

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    placeMarks: placeMarkSlice,
    postMarks: postMarkSlice,
    reviews: reviewSlice,
    
  }
})