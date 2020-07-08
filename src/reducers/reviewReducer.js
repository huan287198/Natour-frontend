import {
  MY_REVIEW_LIST_REQUEST, MY_REVIEW_LIST_SUCCESS, MY_REVIEW_LIST_FAIL,
  REVIEW_SAVE_REQUEST, REVIEW_SAVE_SUCCESS, REVIEW_SAVE_FAIL,
  REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAIL,
} from "../constants/reviewConstants";
  
function myReviewListReducer(state = {
  reviews: []
  }, action) {
    switch (action.type) {
      case MY_REVIEW_LIST_REQUEST:
        return { loading: true };
      case MY_REVIEW_LIST_SUCCESS:
        return { loading: false, reviews: action.payload };
      case MY_REVIEW_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
}

function reviewDeleteReducer(state = { review: {} }, action) {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, REVIEW: action.payload, success: true };
    case REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function reviewSaveReducer(state = { review: {} }, action) {
  switch (action.type) {
    case REVIEW_SAVE_REQUEST:
      return { loading: true };
    case REVIEW_SAVE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case REVIEW_SAVE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}


export { myReviewListReducer, reviewDeleteReducer, reviewSaveReducer };