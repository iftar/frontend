import React, {Fragment, useEffect, useState} from 'react';
import View from '../../components/element-wrappers/View';
import OrderPanel from './OrderPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import ErrorBoundary from '../../components/ErrorBoundary';
import Logger from '../../util/Logger';
import NoItemsFound from '../../components/NoItemsFound';
import ThemedCard from '../../components/cards/ThemedCard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFrownOpen} from '@fortawesome/free-solid-svg-icons';
import {COLOR_PRIMARY} from '../../constants/theme';
import LightText from '../../components/element-wrappers/LightText';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {URL_SELECT_LOCATION} from '../../constants/urls';

function OrdersTodayView(props) {

  const logger = new Logger(OrdersTodayView.name);

  const history = useHistory();

  function onEditClick() {

  }

  function onCreateOrderPress() {
    history.push(URL_SELECT_LOCATION);
  }

  function renderOrderElements() {
    const orders = props.orders;
    if(orders == null || orders.length === 0) {
      return (
          <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
            <ThemedCard style={{ width: '100%' }}>
              <View style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={faFrownOpen} color={COLOR_PRIMARY}></FontAwesomeIcon>
                <LightText>You have no orders for today</LightText>
                <br/>
                <Button variant={"primary"} block onClick={onCreateOrderPress}>Create an order</Button>
              </View>
            </ThemedCard>
          </View>
      )
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