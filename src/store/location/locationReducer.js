import * as types from './actionTypes'

type StateType = {
  coordinates: {latitude: number, longitude:number},
  loading: boolean,
  error: string
}
const INITIAL_STATE: StateType= {
  coordinates: {},
  loading: false,
  error: null
};

function locationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        coordinates: action.payload
      };
    default:
      return state;
  }
}

export default locationReducer;