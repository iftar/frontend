import React, {Fragment, useEffect, useState} from 'react';
import View from '../../components/element-wrappers/View';
import OrderPanel from './OrderPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import ErrorBoundary from '../../components/ErrorBoundary';
import Logger from '../../util/Logger';
import NoItemsFound from '../../components/NoItemsFound';

function OrdersTodayView(props) {

  const logger = new Logger(OrdersTodayView.name);

  function onEditClick() {

  }

  function renderOrderElements() {
    const orders = props.orders;
    if(orders == null || orders.length === 0) {
      return <NoItemsFound/>
    } else {
      return props.orders.map(order => <OrderPanel key={order.id} order={order} onClick={onEditClick}/>);
    }
  }

  return (
      <ErrorBoundary>
        <View style={{display: "flex", flexDirection: "column", paddingTop: "30px", width: "100%"}}>
          <SubHeadingText>Today</SubHeadingText>
          {renderOrderElements()}
        </View>
      </ErrorBoundary>
  )
}

export default OrdersTodayView;