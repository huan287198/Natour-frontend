import {
    TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS, TOUR_LIST_FAIL,
    TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL,
    TOUR_BOOKED_REQUEST, TOUR_BOOKED_SUCCESS, TOUR_BOOKED_FAIL,
    TOUR_TOP5_REQUEST, TOUR_TOP5_SUCCESS, TOUR_TOP5_FAIL,
  } from "../constants/tourConstants"

function tourListReducer(state = { tours: [] }, action) {
    switch (action.type) {
        case TOUR_LIST_REQUEST:
        return { loading: true, tours: [] };
        case TOUR_LIST_SUCCESS:
        return { loading: false, tours: action.payload };
        case TOUR_LIST_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state;
    }
}

function tourDetailReducer(state = { tour: {} }, action) {
    switch (action.type) {
      case TOUR_DETAILS_REQUEST:
        return { loading: true };
      case TOUR_DETAILS_SUCCESS:
        return { loading: false, tour: action.payload.tour, images: action.payload.images,
          reviews: action.payload.reviews, guides: action.payload.guides, 
          locations: action.payload.locations, date: action.payload.date
        };
      case TOUR_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
}

function tourBookedReducer(state = { tour: {} }, action) {
    switch (action.type) {
      case TOUR_BOOKED_REQUEST:
        return { loading: true };
      case TOUR_BOOKED_SUCCESS:
        return { loading: false, book: action.payload };
      case TOUR_BOOKED_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
}

function top5TourReducer(state = { tours: [] }, action) {
  switch (action.type) {
      case TOUR_TOP5_REQUEST:
      return { loading: true, tours: [] };
      case TOUR_TOP5_SUCCESS:
      return { loading: false, tours: action.payload, length: action.length };
      case TOUR_TOP5_FAIL:
      return { loading: false, error: action.payload }
      default:
      return state;
  }
}


export { tourListReducer, tourDetailReducer, tourBookedReducer, top5TourReducer }