import * as types from './actionTypes';

export const selectCollectionLocation = (location) => ({
  type: types.SELECT_COLLECTION_LOCATION,
  payload: location
});
