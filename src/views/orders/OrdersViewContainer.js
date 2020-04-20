import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrdersView from './OrdersView';
import {fetchOrders} from '../../store/orders/actions';


const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  error: state.orders.error,
  loading: state.orders.loading,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({fetchOrders}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(OrdersView)