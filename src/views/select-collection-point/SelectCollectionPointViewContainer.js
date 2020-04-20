import {connect} from 'react-redux';
import SelectCollectionPointView from './SelectCollectionPointView';
import {bindActionCreators} from 'redux';
import {selectCollectionLocation} from '../../store/currentorder/actions';
import {fetchCollectionPoints} from '../../store/collectionpoints/actions';
import {fetchUserOrderCheck} from '../../store/auth/actions';


const mapStateToProps = (state) => ({
  user: state.auth.user,
  userOrderCheck: state.auth.userOrderCheck,
  collectionPoints: state.collectionpoints.collectionPoints,
  error: state.collectionpoints.error,
  loading: state.collectionpoints.loading,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({selectCollectionLocation, fetchCollectionPoints, fetchUserOrderCheck}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectCollectionPointView)