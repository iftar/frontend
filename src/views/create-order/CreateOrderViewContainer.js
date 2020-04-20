import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectCollectionLocation} from '../../store/currentorder/actions';
import CreateOrderView from './CreateOrderView';


const mapStateToProps = (state) => ({
  collectionPoint: state.currentorder.collectionPoint,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({selectCollectionLocation}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderView)