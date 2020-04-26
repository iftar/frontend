import {connect} from 'react-redux';
import SelectCollectionPointView from './SelectCollectionPointView';
import {bindActionCreators} from 'redux';
import {selectCollectionLocation} from '../../store/currentorder/actions';
import {
  fetchCollectionPoints,
  fetchCollectionPointsNearMe,
} from '../../store/collectionpoints/actions';
import {fetchUserOrderCheck} from '../../store/auth/actions';
import {fetchCurrentLocation} from '../../store/location/actions';


const mapStateToProps = (state) => ({
  user: state.auth.user,
  userOrderCheck: state.auth.userOrderCheck,
  collectionPoints: state.collectionpoints.collectionPoints,
  error: state.collectionpoints.error,
  loading: state.collectionpoints.loading,
  locationCoordinates: state.location.coordinates,
  locationError: state.location.error,
  locationLoading: state.location.loading,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({selectCollectionLocation, fetchCollectionPoints, fetchCollectionPointsNearMe, fetchUserOrderCheck, fetchCurrentLocation}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectCollectionPointView)