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

function OrdersView(props) {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders()
        .then(data => setOrders(data))
        .catch(err => setError(err))
        .finally(() => setLoading(false))
  }, [null]);

  function onBackButtonClick() {

  }

  function renderElements() {
    if(loading) {
      return <Loading/>
    } else if(error) {
      return <Error>{error}</Error>
    } else {
      return (
          <Fragment>
            <OrdersTodayView orders={orders}/>
            <OrdersHistoryView orders={orders}/>
          </Fragment>
      )
    }
  }

  return (
      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", height: "100%", paddingBottom: "40px"}}>
        <View style={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
          <CircleIconButton onClick={onBackButtonClick}/>
          <HeadingText style={{fontWeight: "bold", fontSize: "2em"}}>My Orders</HeadingText>
        </View>
        {renderElements()}
      </Container>
  )
}

export default OrdersView;