import NoItemsFound from '../../components/NoItemsFound';
import React, {Fragment, useState} from 'react';
import View from '../../components/element-wrappers/View';
import HeadingText from '../../components/element-wrappers/HeadingText';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import LightText from '../../components/element-wrappers/LightText';
import Row from 'react-bootstrap/Row';
import {Button, Col, Table} from 'react-bootstrap';
import Text from '../../components/element-wrappers/Text';
import OrderCreation from '../../models/OrderCreation';
import AddressUtil from '../../util/AddressUtil';
import moment from 'moment-timezone';
import ordersService from '../../services/ordersService';
import {URL_ORDERS} from '../../constants/urls';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useHistory } from 'react-router-dom';
import Order from '../../models/Order';
import OrderCreationServerRequest
  from '../../models/OrderCreationServerRequest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import collectionPointService from '../../services/collectionPointService';
import isEmpty from 'lodash-es/isEmpty';

type Props = {
  orderCreation: OrderCreation,
  onClose: () => void,
  token: string,
}

function CreateOrderConfirmationDialogue (props : Props) {

  const orderCreation = props.orderCreation;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmedOrder: Order, setConfirmedOrder] = useState(null);

  const history = useHistory();

  function onOrderConfirm() {
    setLoading(true);
    setError(null);
    const orderServerRequest = createOrderRequest(orderCreation);
    if (!isEmpty(orderServerRequest.post_code)) {
      collectionPointService.canDeliverToLocation(props.token,
          orderServerRequest.collection_point_id, orderServerRequest.post_code).
          then((canDeliver) => canDeliver
              ? createOrder(orderServerRequest)
              : setError(`You are not eligible for deliveries from ${orderCreation.collection_point.name}.`)).
          catch((error) => setError(error.message)).
          finally(() => setLoading(false));
    } else {
      createOrder(orderServerRequest);
    }
  }

  function createOrder(orderServerRequest: OrderCreationServerRequest) {
    setLoading(true);
    ordersService.createOrder(props.token, orderServerRequest).
        then((data) => setConfirmedOrder(data)).
        catch((error) => setError(error.message)).
        finally(() => setLoading(false));
  }

  function renderElements() {
    if (loading) {
      return <Loading/>;
    } else if (error) {
      return (
          <View>
          <Error>{error}</Error>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
              <View style={{width: "100%", marginRight: "10px"}}>
                <Button variant={"outline-light"} size={"lg"} block onClick={props.onClose}>Cancel</Button>
              </View>
            </View>
          </View>
      );
    } else if (orderCreation == null) {
      return <NoItemsFound/>
    } else if (confirmedOrder) {
      return (
          <Fragment>
              <SubHeadingText><FontAwesomeIcon icon={faCheckCircle} size={"lg"} color={"white"}/></SubHeadingText>
              <SubHeadingText color={"white"}>Success!</SubHeadingText>

              <Button variant={"light"} block onClick={() => history.push(URL_ORDERS)}>Go to My Orders</Button>
              <hr/>
            <View>
              {/*{renderOrderSummary(confirmedOrder)}*/}
            </View>
          </Fragment>
      )
    } else {
      return (
          <Fragment>
            <View>
              {renderIftarPacks()}
              {props.orderCreation.isDelivery() ? renderDeliveryDetails() : renderPickUpDetails()}
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
              <View style={{width: "100%", marginRight: "10px"}}>
                <Button variant={"outline-light"} size={"lg"} block onClick={props.onClose}>Cancel</Button>
              </View>
              <View style={{width: "100%"}}>
                <Button variant={"light"} size={"lg"} block onClick={onOrderConfirm}>Confirm</Button>
              </View>
            </View>
          </Fragment>
      )
    }
  }

  function renderIftarPacks() {
    return (
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingTop: "20px"}}>
          <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
            <HeadingText color={"white"}>Iftar</HeadingText>
            <HeadingText color={"white"}>Pack(s):</HeadingText>
          </View>
          <Text color={"white"} style={{fontSize: "5em", fontWeight: "bold", paddingLeft: "30px"}}>{orderCreation.quantity}</Text>
        </View>
    )
  }

  function renderPickUpDetails() {
    const requiredDate = new Date(orderCreation.collection_point_time_slot.start_time);
    const date = moment().tz("Europe/London").format("Do MMM YYYY");
    const time = orderCreation.collection_point_time_slot.start_time;
    return (
        <View style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "20px"}}>
          <SubHeadingText color={"white"}>Pick Up Details</SubHeadingText>
          <LightText color={"white"}>Date: {date}</LightText>
          <LightText color={"white"}>Time: {time}</LightText>
          <LightText color={"white"}>Location: {AddressUtil.getFullAddressFormattedFromCollectionPoint(orderCreation.collection_point)}</LightText>
        </View>
    )
  }

  function renderDeliveryDetails() {
    const date = moment().tz("Europe/London").format("Do MMM YYYY");
    return (
        <View style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "20px"}}>
          <SubHeadingText color={"white"}>Delivery Details</SubHeadingText>
          <LightText color={"white"}>Date: {date}</LightText>
          <LightText color={"white"}>Contact Number: {orderCreation.phone}</LightText>
          <LightText color={"white"}>Delivery Address: {AddressUtil.getFullAddressFormattedFromOrderCreation(orderCreation)}</LightText>
        </View>
    )
  }

  function renderOrderSummaryDelivery(order: Order) {
    return (
        <Fragment>
          <tr>
            <td colSpan={2}><LightText color={"white"}>Delivery Address</LightText></td>
          </tr>
            <tr>
              <td><LightText color={"white"}>Address Line 1</LightText></td>
              <td><LightText color={"white"}>{order.address_line_1}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Address Line 2</LightText></td>
              <td><LightText color={"white"}>{order.address_line_2}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>City</LightText></td>
              <td><LightText color={"white"}>{order.city}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>County</LightText></td>
              <td><LightText color={"white"}>{order.county}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Postcode</LightText></td>
              <td><LightText color={"white"}>{order.post_code}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Contact Phone</LightText></td>
              <td><LightText color={"white"}>{order.phone}</LightText></td>
            </tr>
        </Fragment>
    )
  }

  function renderOrderSummary(order: Order) {
    return (
        <Fragment>
          <SubHeadingText color={"white"}>Order Summary</SubHeadingText>

          <LightText>Your order is for {order.address_line_1 == null ? "Collection Only" : "Delivery"}</LightText>

          <Table color={"white"} borderless responsive={"sm"}>
            <tbody>


            <tr>
              <td colSpan={2}><LightText color={"white"}>User Details</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Name:</LightText></td>
              <td><LightText color={"white"}>{order.first_name + ' ' + order.last_name}</LightText></td>
            </tr>


            <tr>
              <td colSpan={2}><LightText color={"white"}>Iftar Packs</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Iftar Packs</LightText></td>
              <td><LightText color={"white"}>{order.quantity}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Date required</LightText></td>
              <td><LightText color={"white"}>{new Date(order.required_date).toTimeString()}</LightText></td>
            </tr>
            <tr>
              <td><LightText color={"white"}>Iftar Center ID</LightText></td>
              <td><LightText color={"white"}>{order.collection_point_id}</LightText></td>
            </tr>
            {order.address_line_1 == null &&
            <tr>
              <td><LightText color={"white"}>Iftar Center Collection Time ID</LightText></td>
              <td><LightText color={"white"}>{order.collection_point_time_slot_id}</LightText>
              </td>
            </tr>
            }


          {order.address_line_1 != null &&
           renderOrderSummaryDelivery(order)
          }

            </tbody>
          </Table>
        </Fragment>
    )
  }

  return (
      <Fragment>
        <View style={{display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#1aadc0", width: "100%", minHeight: "100%", bottom: 0, position: "absolute", zIndex: "10", paddingTop: "40px", paddingBottom: "40px",  paddingLeft: "10%", paddingRight: "10%"}}>
          <HeadingText color={"white"}>Confirmation</HeadingText>
          {renderElements()}
        </View>
      </Fragment>
  )
}

export default CreateOrderConfirmationDialogue;

function createOrderRequest(orderCreation: OrderCreation) {
  const orderServerRequest = new OrderCreationServerRequest();
  orderServerRequest.first_name = orderCreation.first_name;
  orderServerRequest.last_name = orderCreation.last_name;
  orderServerRequest.email = orderCreation.email;
  orderServerRequest.quantity = orderCreation.quantity;
  orderServerRequest.collection_point_id = orderCreation.collection_point.id;
  orderServerRequest.collection_point_time_slot_id = orderCreation.collection_point_time_slot.id;
  orderServerRequest.phone = orderCreation.phone;
  orderServerRequest.address_line_1 = orderCreation.address_line_1;
  orderServerRequest.address_line_2 = orderCreation.address_line_2;
  orderServerRequest.city = orderCreation.city;
  orderServerRequest.county = orderCreation.county;
  orderServerRequest.post_code = orderCreation.post_code;
  orderServerRequest.notes = orderCreation.notes;
  return orderServerRequest;
}