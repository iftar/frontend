import * as types from './actionTypes';
import CollectionPoint from '../../models/CollectionPoint';

type StateType = {
  collectionPoints: Array<CollectionPoint>,
  loading: boolean,
  error: string
}

const INITIAL_STATE : StateType = {
  collectionPoints: [],
  loading: false,
  error: null
};

function collectionPointsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_COLLECTION_POINTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_COLLECTION_POINTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.FETCH_COLLECTION_POINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        collectionPoints: action.payload
      };
    default:
      return state;
  }
}

export default collectionPointsReducer;