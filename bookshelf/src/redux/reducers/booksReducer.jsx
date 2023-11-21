import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  success: false,
  books: [],
  fail: false,
  error: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bookActions.GET_BOOKS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.bookActions.GET_BOOKS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        books: action.payload,
      };
    case actionTypes.bookActions.GET_BOOKS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
      case actionTypes.bookActions.DELETE_BOOK_START:
        return{
          ...state,
          pending:true
        }
      case actionTypes.bookActions.DELETE_BOOK_SUCCESS:
        let filteredBook=state.books.filter(item=>item.id !== action.payload)
    
        return {
          ...state,
          pending: false,
          success: true,
          fail: false,
          books: filteredBook
        };
      case actionTypes.bookActions.DELETE_BOOK_FAIL:
        return {
          ...state,
          pending: false,
          success: false,
          fail: true,
          error: action.payload,
        };
        case actionTypes.bookActions.ADD_BOOK:
          return{
            ...state,
            book:[...state.books,action.payload]
          }
          var temp=[]
          for(let i=0;i<state.books.length;i++){
            if(state.books[i].id!==action.payload.id){
              temp.push(state.books[i])
            }else{
              temp.push(action.payload)
            }
          }
          return{
            ...state,
            books:temp
          }
          case actionTypes.categoryActions.DELETE_CATEGORY:
            var filteredCategories=state.categories.filter(item=>item.id !== action.payload)
            return{
              ...state,
              categories:filteredCategories
            }
            case actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY:
            var temp=state=state.books.filter(item=>item.categoryId !== action.payload)
            return{
              ...state,
              books:temp
            } 
            
        default:
      return state;
  }
};

export default booksReducer;
