import React, {Fragment, useEffect, useState} from 'react';
import View from '../../components/element-wrappers/View';
import OrderPanel from './OrderPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import ErrorBoundary from '../../components/ErrorBoundary';
import NoItemsFound from '../../components/NoItemsFound';
import Order from '../../models/Order';

type Props = {
  orders: Array<Order>,
  onReorderClick: (order: Order) => void
}

function OrdersHistoryView(props: Props) {

  function onClick(order: Order) {
    props.onReorderClick(order)
  }

  function renderOrderElements() {
    const orders = props.orders;
    if(orders == null || orders.length === 0) {
      return <NoItemsFound/>
    } else {
      return orders.map(order => <OrderPanel key={order.id} order={order} onClick={() => onClick(order)} buttonText={"Reorder"}/>);
    }
  }

  return (
      <ErrorBoundary>
        <View style={{display: "flex", flexDirection: "column", paddingTop: "30px", width: "100%"}}>
          <SubHeadingText>History</SubHeadingText>
          {renderOrderElements()}
        </View>
      </ErrorBoundary>
  )
}

export default OrdersHistoryView;