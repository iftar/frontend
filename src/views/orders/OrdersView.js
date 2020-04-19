import React, {Fragment} from 'react';
import {Container} from 'react-bootstrap';
import OrdersTodayView from './OrdersTodayView';
import OrdersHistoryView from './OrdersHistoryView';
import View from '../../components/element-wrappers/View';
import CircleIconButton from '../../components/button/CircleIconButton';

function OrdersView(props) {

  function onBackButtonClick() {

  }

  return (
      <Container fluid style={{display: "flex", alignItems: "center", overflowY: "scroll"}}>
        <View style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
          <CircleIconButton onClick={onBackButtonClick}/>
          <h3>My Orders</h3>
        </View>
        <OrdersTodayView/>
        <OrdersHistoryView/>
      </Container>
  )
}

export default OrdersView;