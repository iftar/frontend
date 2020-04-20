import React, {Fragment, useEffect, useState} from 'react';
import { Container, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import HeadingText from '../../components/element-wrappers/HeadingText';
import CircleIconButton from '../../components/button/CircleIconButton';
import View from '../../components/element-wrappers/View';
import { useHistory } from 'react-router-dom';

import bluePin from "../../assets/images/bluepin.png";
import ThemedCard from '../../components/cards/ThemedCard';
import {faMapPin, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import IconWithTextPanel from '../../components/icons/IconWithTextPanel';
import CollectionPointAddressUtil from '../../util/CollectionPointAddressUtil';
import CollectionPoint from '../../models/CollectionPoint';
import {URL_ORDERS, URL_SELECT_LOCATION} from '../../constants/urls';
import LightText from '../../components/element-wrappers/LightText';
import ErrorBoundary from '../../components/ErrorBoundary';
import Error from '../../components/Error';
import Logger from '../../util/Logger';
import moment from 'moment';
import Loading from '../../components/Loading';
import CreateOrderConfirmationDialogue from './CreateOrderConfirmationDialogue';
import {createOrder, getUser} from '../../util/api';
import OrderRequest from '../../models/OrderRequest';
import Header from '../../components/Header';

type Props = {
  collectionPoint: CollectionPoint
}

const CreateOrder = (props : Props) => {
  const logger = new Logger(CreateOrder.name);
  const IFTAR_ORDER_LIMIT = 10;

  const collectionPoint = props.collectionPoint;

  const [iftarOrderQuantities, setIftarOrderQuantities] = useState([]);

  const [iftarOrders, setIftarOrders] = useState(1);
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(0);
  const [isCollection, setIsCollection] = useState(true);

  // Delivery details
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isFormValidated, setIsFormValidated] = useState("");

  const [orderRequest, setOrderRequest] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const quantities = [];
    for(let i=1; i<=IFTAR_ORDER_LIMIT; i++) {
      quantities.push(i);
    }
    setIftarOrderQuantities(quantities)
  }, [null]);

  useEffect(() => {
    if (collectionPoint === null) {
      history.push(URL_SELECT_LOCATION);
    }
  }, [collectionPoint]);


  function onBackButtonClick() {
    history.goBack();
  }

  function onOrderSubmit(event) {
    const form = event.currentTarget;
    setIsFormValidated(true);
    if (form.checkValidity() === true) {
      logger.info("success validation")
      const order = createOrderRequest();
      setOrderRequest(order);
    } else {
      logger.info("failed validation")
    }
    event.preventDefault();
    event.stopPropagation();
  }

  function onOrderConfirm() {
    setLoading(true);
    setError(null);
    createOrder(orderRequest)
        .then((data) => {
          history.push(URL_ORDERS);
    })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
  }

  function onOrderCancel() {
    setOrderRequest(null);
  }

  function onCollectionSelected() {
    setIsCollection(true);
  }

  function onDeliverySelected() {
    setIsCollection(false);
  }

  function createOrderRequest() {
    const user = getUser();
    const orderRequest = new OrderRequest();
    orderRequest.first_name = user.first_name;
    orderRequest.last_name = user.last_name;
    orderRequest.email = user.email;
    orderRequest.quantity = iftarOrders;
    orderRequest.collection_point = collectionPoint;
    orderRequest.collection_point_time_slot = collectionPoint.collection_point_time_slots[selectedTimeSlotIndex];
    orderRequest.collection_point_id = collectionPoint.id;
    orderRequest.collection_point_time_slot_id = orderRequest.collection_point_time_slot.id;

    // Delivery only
    if (!isCollection) {
      orderRequest.phone = phone;
      orderRequest.address_line_1 = addressLine1;
      orderRequest.address_line_2 = addressLine2;
      orderRequest.city = city;
      orderRequest.county = county;
      orderRequest.post_code = postCode;
    }
    return orderRequest;
  }

  function CollectionCenterDetailsPanel() {
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "column", width: "100%"}}>
              <LightText>{collectionPoint.name}</LightText>
              <IconWithTextPanel icon={faMapPin} text={CollectionPointAddressUtil.getFullAddressFormatted(collectionPoint)}/>
              <IconWithTextPanel icon={faShoppingBag} text={collectionPoint.max_daily_capacity + ' meals left'}/>
            </View>
          </ThemedCard>
        </Fragment>
    )
  }

  function IftarPacksOptionPanel() {
    const options  = iftarOrderQuantities.map(amount => (
        <option key={amount} value={amount}>{amount}</option>
    ));
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <LightText>How many Iftar Packs?</LightText>
                  <Form.Control
                      as="select"
                      value={iftarOrders}
                      custom
                      onChange={(event) => setIftarOrders(event.target.value)}
                  >
                    {options}
                  </Form.Control>
            </View>
          </ThemedCard>
        </Fragment>
    )
  }

  function DeliveryOptionsPanel() {

    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%"}}>
              <Form.Check
                  name="collection-or-delivery"
                  type={"radio"}
                  label={"Collection"}
                  id={"radio-collection"}
                  onChange={onCollectionSelected}
                  checked={isCollection}
              />
              <Form.Check
                  name="collection-or-delivery"
                  type={"radio"}
                  label={"Delivery"}
                  id={"radio-delivery"}
                  onChange={onDeliverySelected}
                  checked={!isCollection}
              />

            </View>
            {!isCollection &&
            <View style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", width: "100%", paddingTop: "30px"}}>
              <hr/>
              <LightText>Delivery Details:</LightText>

              <Form.Group >
                <Form.Label>Address Line 1 (required)</Form.Label>
                <Form.Control type="text" required
                              defaultValue={addressLine1}
                              onChange={(event) => setAddressLine1(event.target.value)}/>
                <Form.Control.Feedback type="invalid">
                  Address is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                    as={"input"}
                    value={addressLine2}
                    onChange={(event) => setAddressLine2(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                    as={"input"}
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>County</Form.Label>
                <Form.Control
                    as={"input"}
                    value={county}
                    onChange={(event) => setCity(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Postcode (required)</Form.Label>
                <Form.Control
                    as={"input"}
                    value={postCode}
                    required
                    onChange={(event) => {
                      setPostCode(event.target.value);
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                />
                <Form.Control.Feedback type="invalid">
                  Postcode is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number (required)</Form.Label>
                <Form.Control
                    as={"input"}
                    value={phone}
                    required
                    onChange={(event) => setPhone(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Phone number is required
                </Form.Control.Feedback>
              </Form.Group>
            </View>
            }
          </ThemedCard>
        </Fragment>
    )
  }

  function SelectTimePanel() {
    const collectionPointTimes = collectionPoint.collection_point_time_slots;
    if (collectionPointTimes === null) {
      return <Error>Could not load collection times.</Error>;
    }
    const selectItems = collectionPointTimes.map((collectionPointTime, i) => {
      return <option key={collectionPointTime.id} value={i}>{collectionPointTime.start_time}</option>
    });
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%"}}>
              <LightText>Select time slot </LightText>
              <Form.Control
                    as="select"
                    value={selectedTimeSlotIndex}
                    custom
                    onChange={(event) => setSelectedTimeSlotIndex(event.target.value)}
                >
                  {selectItems.reverse()}
                </Form.Control>
            </View>
          </ThemedCard>
        </Fragment>
    )
  }

  function renderElements() {
    if (loading) {
      return <Loading/>;
    } else if (error) {
      return <Error>{error}</Error>;
    } else {
      return (
          <Fragment>
            <Form validated={isFormValidated} onSubmit={onOrderSubmit}>

              <CollectionCenterDetailsPanel collectionPoint={collectionPoint}/>

              <IftarPacksOptionPanel/>

              <DeliveryOptionsPanel/>

              <SelectTimePanel/>

              <Button type={"submit"} variant="primary" size={"lg"} block>Submit Order</Button>
            </Form>

            {orderRequest != null && <CreateOrderConfirmationDialogue onClose={onOrderCancel} onConfirm={onOrderConfirm} orderRequest={orderRequest}/>}
          </Fragment>
      );
    }
  }

  if (props.collectionPoint === null) {
    return <Error>No collection point selected</Error>;
  } else {
    return (
        <ErrorBoundary>
          <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100%", marginBottom: "60px" }}>
            <Header title={"Create Order"}/>

            {renderElements()}

          </Container>
        </ErrorBoundary>
    );
  }

};

export default CreateOrder
