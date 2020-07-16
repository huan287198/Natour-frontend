import { 
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL 
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

// function addToCartReducer(state = {}, action) {
//   switch (action.type) {
//     case ADD_TO_CART_REQUEST:
//       return { loading: true };
//     case ADD_TO_CART_SUCCESS:
//       return { loading: false, cart: action.payload };
//     case ADD_TO_CART_FAIL:
//       return { loading: false, error: action.payload };
//     default: return state;
//   }
// }

// function getCartReducer(state = {}, action) {
//   switch (action.type) {
//     case GET_CART_ITEM_REQUEST:
//       return { loading: true };
//     case GET_CART_ITEM_SUCCESS:
//       return { loading: false, carts: action.payload };
//     case GET_CART_ITEM_FAIL:
//       return { loading: false, error: action.payload };
//     default: return state;
//   }
// }

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export {
  userSigninReducer, userRegisterReducer, userUpdateReducer
}