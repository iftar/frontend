import React, {Fragment, useEffect, useState} from 'react';
import View from '../../components/element-wrappers/View';
import OrderPanel from './OrderPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';

function OrdersTodayView(props) {

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: api call
    setOrders([{
      "id": 3121,
      "name": "John smith",
      "type": "collection",
      "collection_point_id": 31,
      "collection_point_timeslot_id": 28,
      "meals_adults": 2,
      "meals_children": 3,
      "notes": "Some important information about the order"
    }]);
  }, [null]);

  function onEditClick() {

  }

  function renderOrderElements() {
    return orders.map(order => <OrderPanel order={order} onClick={onEditClick}/>);
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