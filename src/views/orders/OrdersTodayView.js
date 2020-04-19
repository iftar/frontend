import React, {Fragment, useEffect, useState} from 'react';

function OrdersTodayView(props) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: api call
    setOrders({
      "id": 3121,
      "name": "John smith",
      "type": "collection",
      "collection_point_id": 31,
      "collection_point_timeslot_id": 28,
      "meals_adults": 2,
      "meals_children": 3,
      "notes": "Some important information about the order"
    });
  }, [null]);

  return (
      <Fragment>

      </Fragment>
  )
}

export default OrdersTodayView;