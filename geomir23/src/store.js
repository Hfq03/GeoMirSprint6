
import { configureStore } from '@reduxjs/toolkit'
import placeMarkReducer from './slices/places/placeMarkSlice'
import todosReducer  from './slices/todoSlice'
import reviewReducer  from './slices/places/reviews/reviewSlice'
import placeReducer  from './slices/places/placeSlice'
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    marks: placeMarkReducer,
    reviews: reviewReducer,
    places: placeReducer,
  },
})