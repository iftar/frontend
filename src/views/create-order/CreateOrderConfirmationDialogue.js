import NoItemsFound from '../../components/NoItemsFound';
import React, {Fragment} from 'react';
import View from '../../components/element-wrappers/View';
import HeadingText from '../../components/element-wrappers/HeadingText';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import LightText from '../../components/element-wrappers/LightText';
import Row from 'react-bootstrap/Row';
import {Col} from 'react-bootstrap';

function CreateOrderConfirmationDialogue (props) {

  const order = props.order || {
    "id": 22,
    "user_id": 1,
    "quantity": "6",
    "required_date": "2020-04-17T00:00:00.000000Z",
    "collection_point_id": 2,
    "collection_point_time_slot_id": 9,
    "first_name": "Share",
    "last_name": "Iftar",
    "email": "info@shareiftar.org",
    "phone": null,
    "address_line_1": null,
    "address_line_2": null,
    "city": null,
    "county": null,
    "post_code": null,
    "notes": null,
    "status": "accepted",
    "created_at": "2020-04-17T00:28:28.000000Z",
    "updated_at": "2020-04-18T17:29:32.000000Z"
  };

  function renderElements() {
    if(order == null) {
      return <NoItemsFound/>
    } else {
      return (
          <Fragment>

          </Fragment>
      )
    }
  }

  return (
      <Fragment>
        <View style={{display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#1bd2d7", width: "100%", bottom: 0, position: "absolute", zIndex: "10", paddingTop: "40px",  paddingLeft: "10%", paddingRight: "10%"}}>
          <HeadingText color={"white"}>Confirmation</HeadingText>
          <View>
            <IftarPacks order={order}/>
            <PickUpDetails order={order}/>
          </View>
        </View>
      </Fragment>
  )
}

function IftarPacks(props) {
  return (
      <View style={{display: "flex", flexDirection: "row", paddingTop: "20px"}}>
        <HeadingText color={"white"}>Iftar Pack: {props.order.quantity}</HeadingText>

      </View>
  )
}

function PickUpDetails(props) {
  const order = props.order;
  const requiredDate = new Date(order.required_date);
  const date = requiredDate.toLocaleDateString();
  const time = requiredDate.toTimeString();
  return (
      <View style={{display: "flex", flexDirection: "column", paddingTop: "20px"}}>
        <SubHeadingText color={"white"}>Pick Up Details</SubHeadingText>
        <LightText color={"white"}>Date: {date}</LightText>
        <LightText color={"white"}>Time: {time}</LightText>
        <LightText color={"white"}>Location: {order.collection_point_id}</LightText>

      </View>
  )
}

export default CreateOrderConfirmationDialogue;