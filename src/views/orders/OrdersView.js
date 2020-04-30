import React, {Fragment, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import OrdersTodayView from './OrdersTodayView';
import OrdersHistoryView from './OrdersHistoryView';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ErrorBoundary from '../../components/ErrorBoundary';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import Logger from '../../util/Logger';
import each from 'lodash/each'
import Header from '../../components/Header';
import Order from '../../models/Order';
import {fetchOrders} from '../../store/orders/actions';
import PaddedScrollableYView
  from '../../components/views/PaddedScrollableYView';
import Text from '../../components/element-wrappers/Text';
import OrderCreation from '../../models/OrderCreation';
import CreateOrderConfirmationDialogue
  from '../create-order/CreateOrderConfirmationDialogue';

type Props = {
  orders: Array<Order>,
  loading: boolean,
  error: string,
  token: string,

  fetchOrders: () => void,
  createOrder: (orderCreation: OrderCreation) => void,
}

function OrdersView(props : Props) {
  const logger = new Logger(OrdersView.name);

  const [todaysOrders, setTodaysOrders] = useState([]);
  const [historicOrders, setHistoricOrders] = useState([]);
  const [orderCreation, setOrderCreation] = useState(null);

  const history = useHistory();

  useEffect(() => {
    props.fetchOrders();
  }, [null]);

  useEffect(() => {
    const currentDate = moment().date();

    let ordersForToday = [];
    let ordersForHistory = [];

    each(props.orders, (d) => {
      const orderDate = moment(d.required_date).date();
      if(orderDate === currentDate) {
        ordersForToday.push(d);
      } else {
        ordersForHistory.push(d);
      }
    });

    setTodaysOrders(ordersForToday);
    setHistoricOrders(ordersForHistory);
  }, [props.orders]);
  
  function onReorderClick(order: Order) {
    const orderCreation = new OrderCreation();
    orderCreation.first_name = order.first_name;
    orderCreation.last_name = order.last_name;
    orderCreation.email = order.email;
    orderCreation.quantity = order.quantity;
    orderCreation.collection_point = order.collection_point;
    orderCreation.collection_point_time_slot = order.collection_point_time_slot;
    orderCreation.notes = order.notes;

    // Delivery only
    orderCreation.phone = order.phone;
    orderCreation.address_line_1 = order.address_line_1;
    orderCreation.address_line_2 = order.address_line_2;
    orderCreation.city = order.city;
    orderCreation.county = order.county;
    orderCreation.post_code = order.post_code;
    
    setOrderCreation(orderCreation);
  }

  function renderElements() {
    if (props.loading) {
      return <Loading/>;
    } else if (props.error) {
      return <Error>{props.error}</Error>;
    } else if (orderCreation) {
      return <CreateOrderConfirmationDialogue orderCreation={orderCreation} onClose={() => setOrderCreation(null)} token={props.token}/>
    } else {
      return (
          <Fragment>
            <div className="alert alert-info">
              <Text style={{fontWeight: "bold"}}>Please note orders can only be placed between 12am and 2pm each day.</Text>
            </div>
            <div>
              <OrdersTodayView orders={todaysOrders}/>
            </div>
            <div>
              <OrdersHistoryView orders={historicOrders} onReorderClick={onReorderClick}/>
            </div>
          </Fragment>
      );
    }
  }

  return (
      <PaddedScrollableYView>
        <Header title={"My Orders"}/>
        {renderElements()}
      </PaddedScrollableYView>
  );
}

export default OrdersView;