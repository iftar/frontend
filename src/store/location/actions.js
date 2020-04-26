import * as types from './actionTypes'
import locationService from '../../services/locationService';

export const fetchCurrentLocation = () => {
  return async (dispatch) => {
    dispatch(fetchCurrentLocationRequest());
    locationService.getLocation((coordinates: {latitude: number, longitude:number}) => {
      dispatch(fetchCurrentLocationSuccess(coordinates))
    }, (error) => {
      dispatch(fetchCurrentLocationFailure(error))
    })
  }
};


export const fetchCurrentLocationRequest = () => ({
  type: types.FETCH_LOCATION_REQUEST
});

export const fetchCurrentLocationFailure = (error : string) => ({
  type: types.FETCH_LOCATION_FAILURE,
  payload: error
});

export const fetchCurrentLocationSuccess = (coordinates: {latitude: number, longitude:number}) => ({
  type: types.FETCH_LOCATION_SUCCESS,
  payload: coordinates
});