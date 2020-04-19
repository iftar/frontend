import React, {Fragment, useEffect, useState} from 'react';
import View from '../../components/element-wrappers/View';
import OrderPanel from './OrderPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';

function OrdersTodayView(props) {

  function onEditClick() {

  }

  function renderOrderElements() {
    return props.orders.map(order => <OrderPanel order={order} onClick={onEditClick}/>);
  }

  return (
      <Fragment>
        <View style={{display: "flex", flexDirection: "column", paddingTop: "30px", width: "100%"}}>
          <SubHeadingText>Today</SubHeadingText>
          {renderOrderElements()}
        </View>
      </Fragment>
  )
}

export default OrdersTodayView;