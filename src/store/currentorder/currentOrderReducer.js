import * as types from './actionTypes';
import CollectionPoint from '../../models/CollectionPoint';

type StateType = {
  collectionPoint: CollectionPoint
}

const INITIAL_STATE : StateType= {
  collectionPoint: null,
};


function currentOrderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SELECT_COLLECTION_LOCATION:
      return {
        ...state,
        collectionPoint: action.payload
      };
    default:
      return state;
  }
}

export default currentOrderReducer;