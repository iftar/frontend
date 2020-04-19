import React, {Fragment} from 'react';
import {Container} from 'react-bootstrap';
import OrdersTodayView from './OrdersTodayView';
import OrdersHistoryView from './OrdersHistoryView';
import View from '../../components/element-wrappers/View';
import CircleIconButton from '../../components/button/CircleIconButton';
import Text from '../../components/element-wrappers/Text';
import HeadingText from '../../components/element-wrappers/HeadingText';

function OrdersView(props) {

  function onBackButtonClick() {

  }

  return (
      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", overflowY: "scroll", height: "100%", paddingBottom: "40px"}}>
        <View style={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
          <CircleIconButton onClick={onBackButtonClick}/>
          <HeadingText style={{fontWeight: "bold", fontSize: "2em"}}>My Orders</HeadingText>
        </View>
        <OrdersTodayView/>
        <OrdersHistoryView/>
      </Container>
  )
}

export default OrdersView;