import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { 
  tourListReducer, tourDetailReducer, tourBookedReducer, top3TourReducer 
} from './reducers/tourReducers';
import { 
  userSigninReducer, userRegisterReducer, userUpdateReducer
} from './reducers/userReducers';
import { 
  myBookListReducer, bookTourReducer, bookListReducer, bookDeleteReducer, 
  createBookingReducer 
} from './reducers/bookReducers';
import { myReviewListReducer, reviewDeleteReducer, reviewSaveReducer } from './reducers/reviewReducer';

// const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
  tourList: tourListReducer,
  tourDetail: tourDetailReducer,
  top3Tour: top3TourReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  tourBooked: tourBookedReducer,
  myReviewList: myReviewListReducer,
  reviewSave: reviewSaveReducer,
  reviewDelete: reviewDeleteReducer,
  myBookList: myBookListReducer,
  bookTour: bookTourReducer,
  bookList: bookListReducer,
  bookDelete: bookDeleteReducer,
  bookCreate: createBookingReducer,
 
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;