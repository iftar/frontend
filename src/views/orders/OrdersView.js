import React, {Fragment, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import OrdersTodayView from './OrdersTodayView';
import OrdersHistoryView from './OrdersHistoryView';
import View from '../../components/element-wrappers/View';
import CircleIconButton from '../../components/button/CircleIconButton';
import Text from '../../components/element-wrappers/Text';
import HeadingText from '../../components/element-wrappers/HeadingText';
import {getOrders} from '../../util/api';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ErrorBoundary from '../../components/ErrorBoundary';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import Logger from '../../util/Logger';
import each from 'lodash/each'
import Header from '../../components/Header';

function OrdersView(props) {
  const logger = new Logger(OrdersView.name);

  const [orders, setOrders] = useState([]);
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [historicOrders, setHistoricOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const currentDate = moment().date();

    setLoading(true);
    setError(null);
    getOrders().
        then(data => {
          let ordersForToday = [];
          let ordersForHistory = [];

          each(data, (d) => {
            const orderDate = moment(d.required_date).date();
            if(orderDate === currentDate) {
              ordersForToday.push(d);
            } else {
              ordersForHistory.push(d);
            }
          });

          setTodaysOrders(ordersForToday);
          setHistoricOrders(ordersForHistory);
        }).
        catch(err => setError(err.message)).
        finally(() => setLoading(false));
  }, [null]);

  function renderElements() {
    if (loading) {
      return <Loading/>;
    } else if (error) {
      return <Error>{error}</Error>;
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
      <ErrorBoundary>
        <Container style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          paddingBottom: '40px',
          paddingTop: '40px',
        }}>
          <Header title={"My Orders"}/>
          {renderElements()}
        </Container>
      </ErrorBoundary>
  );
}

export default OrdersView;