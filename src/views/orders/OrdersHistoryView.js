import React, {Fragment, useEffect, useState} from 'react';
import View from '../../components/element-wrappers/View';
import OrderPanel from './OrderPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import ErrorBoundary from '../../components/ErrorBoundary';
import NoItemsFound from '../../components/NoItemsFound';

function OrdersHistoryView(props) {

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
    }, {
      "id": 3121,
      "name": "John smith",
      "type": "collection",
      "collection_point_id": 31,
      "collection_point_timeslot_id": 28,
      "meals_adults": 2,
      "meals_children": 3,
      "notes": "Some important information about the order"
    }, {
      "id": 3121,
      "name": "John smith",
      "type": "collection",
      "collection_point_id": 31,
      "collection_point_timeslot_id": 28,
      "meals_adults": 2,
      "meals_children": 3,
      "notes": "Some important information about the order"
    }, {
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


  function renderOrderElements() {
    const orders = props.orders;
    if(orders == null || orders.length === 0) {
      return <NoItemsFound/>
    } else {
      return orders.map(order => <OrderPanel key={order.id} order={order}/>);
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