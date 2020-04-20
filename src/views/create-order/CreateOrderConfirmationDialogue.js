import NoItemsFound from '../../components/NoItemsFound';
import React, {Fragment} from 'react';
import View from '../../components/element-wrappers/View';
import HeadingText from '../../components/element-wrappers/HeadingText';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import LightText from '../../components/element-wrappers/LightText';
import Row from 'react-bootstrap/Row';
import {Button, Col} from 'react-bootstrap';
import Text from '../../components/element-wrappers/Text';
import OrderRequest from '../../models/OrderRequest';
import CollectionPointAddressUtil from '../../util/CollectionPointAddressUtil';
import moment from 'moment-timezone';

type Props = {
  orderRequest: OrderRequest,
  onClose: () => void,
  onConfirm: () => void,
}

function CreateOrderConfirmationDialogue (props : Props) {

  const orderRequest = props.orderRequest;

  function renderElements() {
    if(orderRequest == null) {
      return <NoItemsFound/>
    } else {
      return (
          <Fragment>

          </Fragment>
      )
    }
  }

  function IftarPacks() {
    return (
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingTop: "20px"}}>
          <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
            <HeadingText color={"white"}>Iftar</HeadingText>
            <HeadingText color={"white"}>Pack:</HeadingText>
          </View>
          <Text color={"white"} style={{fontSize: "5em", fontWeight: "bold", paddingLeft: "30px"}}>{orderRequest.quantity}</Text>

        </View>
    )
  }

  function PickUpDetails() {
    const requiredDate = new Date(orderRequest.collection_point_time_slot.start_time);
    const date = moment().tz("Europe/London").format("Do MMM YYYY");
    const time = orderRequest.collection_point_time_slot.start_time;
    return (
        <View style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "20px"}}>
          <SubHeadingText color={"white"}>Pick Up Details</SubHeadingText>
          <LightText color={"white"}>Date: {date}</LightText>
          <LightText color={"white"}>Time: {time}</LightText>
          <LightText color={"white"}>Location: {CollectionPointAddressUtil.getFullAddressFormatted(orderRequest.collection_point)}</LightText>

        </View>
    )
  }

  return (
      <Fragment>
        <View style={{display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#1aadc0", width: "100%", minHeight: "75%", bottom: 0, position: "absolute", zIndex: "10", paddingTop: "40px", paddingBottom: "40px",  paddingLeft: "10%", paddingRight: "10%"}}>
          <HeadingText color={"white"}>Confirmation</HeadingText>
          <View>
            <IftarPacks order={orderRequest}/>
            <PickUpDetails order={orderRequest}/>
          </View>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
            <View style={{width: "100%", marginRight: "10px"}}>
            <Button variant={"outline-light"} size={"lg"} block onClick={props.onClose}>Cancel</Button>
            </View>
            <View style={{width: "100%"}}>
            <Button variant={"light"} size={"lg"} block onClick={props.onConfirm}>Confirm</Button>
            </View>
          </View>
        </View>
      </Fragment>
  )
}

export default CreateOrderConfirmationDialogue;