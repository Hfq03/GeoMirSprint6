
export const placeMarksReducer = (initialState, action) => {

  switch (action.type) {
    case "AddMark":
      console.log("eoeoeoe")
    
     return [ ...initialState, action.payload]

    case "DelMark":
      // Retornarà un nou array amb tots els elements menys el de l'id
            return initialState.filter( placeMark => placeMark.id !== action.payload)
 
    default:
      return [...initialState] ;
  }
};
