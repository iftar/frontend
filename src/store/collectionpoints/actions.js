import * as types from './actionTypes';
import CollectionPoint from '../../models/CollectionPoint';
import collectionPointService from '../../services/collectionPointService';

export const fetchCollectionPoints = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCollectionPointsRequest());
    const token = getState().auth.token;
    try {
      const collectionPoints = await collectionPointService.fetchCollectionPoints(token);
      dispatch(fetchCollectionPointsSuccess(collectionPoints));
    } catch (e) {
      dispatch(fetchCollectionPointsFailure(e.message));
    }
  }
};

export const fetchCollectionPointsNearMe = (postcode: string) => {
  return async (dispatch, getState) => {
    dispatch(fetchCollectionPointsRequest());
    const token = getState().auth.token;
    const {latitude, longitude} = getState().location.coordinates;
    try {
      const collectionPoints = await collectionPointService.fetchCollectionPointsNearMeUsingPostcode(token, postcode);
      dispatch(fetchCollectionPointsSuccess(collectionPoints));
    } catch (e) {
      dispatch(fetchCollectionPointsFailure(e.message));
    }
  }
};

export const fetchCollectionPointsRequest = () => ({
  type: types.FETCH_COLLECTION_POINTS_REQUEST
});
export const fetchCollectionPointsFailure= (error: string) => ({
  type: types.FETCH_COLLECTION_POINTS_FAILURE,
  payload: error
});
export const fetchCollectionPointsSuccess = (collectionPoints: Array<CollectionPoint>) => ({
  type: types.FETCH_COLLECTION_POINTS_SUCCESS,
  payload: collectionPoints
});