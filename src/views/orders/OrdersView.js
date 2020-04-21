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

type Props = {
  orders: Array<Order>,
  loading: boolean,
  error: string,

  fetchOrders: () => void,
}

function OrdersView(props : Props) {
  const logger = new Logger(OrdersView.name);

  const [todaysOrders, setTodaysOrders] = useState([]);
  const [historicOrders, setHistoricOrders] = useState([]);

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

  function renderElements() {
    if (props.loading) {
      return <Loading/>;
    } else if (props.error) {
      return <Error>{props.error}</Error>;
    } else {
      return (
          <Fragment>
            <OrdersTodayView orders={todaysOrders}/>
            <OrdersHistoryView orders={historicOrders}/>
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