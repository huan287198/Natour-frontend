import {
  MY_BOOK_LIST_REQUEST, MY_BOOK_LIST_SUCCESS, MY_BOOK_LIST_FAIL,
  BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_CREATE_FAIL,
  BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL,
  BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL,
} from "../constants/bookConstants";

function myBookListReducer(state = {
    books: []
  }, action) {
    switch (action.type) {
      case MY_BOOK_LIST_REQUEST:
        return { loading: true };
      case MY_BOOK_LIST_SUCCESS:
        return { loading: false, books: action.payload };
      case MY_BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
}

function bookTourReducer(state = {}, action) {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, book: action.payload, success: true };
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function bookListReducer(state = { books: [] }, action) {
  switch (action.type) {
      case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };
      case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload, length: action.length };
      case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload }
      default:
      return state;
  }
}

function bookDeleteReducer(state = { book: {} }, action) {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, book: action.payload, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export { myBookListReducer, bookTourReducer, bookListReducer, bookDeleteReducer };