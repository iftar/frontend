import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Container,
  Card,
  Form,
  ButtonGroup,
  ToggleButton,
  Button
} from "react-bootstrap";
import HeadingText from "../../components/element-wrappers/HeadingText";
import CircleIconButton from "../../components/button/CircleIconButton";
import View from "../../components/element-wrappers/View";
import { useHistory } from "react-router-dom";

import bluePin from "../../assets/images/bluepin.png";
import ThemedCard from "../../components/cards/ThemedCard";
import {
  faBuilding,
  faMapPin,
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import IconWithTextPanel from "../../components/icons/IconWithTextPanel";
import AddressUtil from "../../util/AddressUtil";
import CollectionPoint from "../../models/CollectionPoint";
import { URL_ORDERS, URL_SELECT_LOCATION } from "../../constants/urls";
import LightText from "../../components/element-wrappers/LightText";
import ErrorBoundary from "../../components/ErrorBoundary";
import Error from "../../components/Error";
import Logger from "../../util/Logger";
import moment from "moment";
import Loading from "../../components/Loading";
import CreateOrderConfirmationDialogue from "./CreateOrderConfirmationDialogue";
import OrderCreation from "../../models/OrderCreation";
import Header from "../../components/Header";
import User from "../../models/User";
import ordersService from "../../services/ordersService";
import Order from "../../models/Order";
import PaddedScrollableYView from "../../components/views/PaddedScrollableYView";

type Props = {
  user: User,
  token: string,
  collectionPoint: CollectionPoint
};

const CreateOrderView = (props: Props) => {
  const logger = new Logger(CreateOrderView.name);
  const IFTAR_ORDER_LIMIT = 10;

  // For form validation
  const formRef = useRef();

  //
  const [iftarOrders, setIftarOrders] = useState(1);
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(0);
  const [isCollection, setIsCollection] = useState(true);
  const [notes, setNotes] = useState("");

  // Delivery details
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isFormValidated, setIsFormValidated] = useState("");

  const [orderCreation: OrderCreation, setOrderCreation] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (props.collectionPoint === null) {
      history.push(URL_SELECT_LOCATION);
    }
  }, [props.collectionPoint]);

  function onOrderSubmit() {
    // const form = event.currentTarget;
    setIsFormValidated(true);
    if (formRef.current.checkValidity() === true) {
      logger.info("formRef", formRef);
      logger.info("success validation");
      const order = createOrderCreation();
      setOrderCreation(order);
    } else {
      logger.info("failed validation");
    }
    // event.preventDefault();
    // event.stopPropagation();
  }

  function onOrderConfirm() {
    setLoading(true);
    setError(null);
    ordersService
      .createOrder(props.token, orderCreation)
      .then(data => history.push(URL_ORDERS))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }

  function onOrderCancel() {
    setOrderCreation(null);
  }

  function onCollectionSelected() {
    setIsCollection(true);
  }

  function onDeliverySelected() {
    setIsCollection(false);
  }

  function createOrderCreation() {
    const user = props.user;
    const orderCreation = new OrderCreation();
    orderCreation.first_name = user.first_name;
    orderCreation.last_name = user.last_name;
    orderCreation.email = user.email;
    orderCreation.quantity = iftarOrders;
    orderCreation.collection_point = props.collectionPoint;
    orderCreation.collection_point_time_slot =
      props.collectionPoint.collection_point_time_slots[selectedTimeSlotIndex];
    orderCreation.notes = notes;
    orderCreation.phone = phone;

    // Delivery only
    if (!isCollection) {
      orderCreation.address_line_1 = addressLine1;
      orderCreation.address_line_2 = addressLine2;
      orderCreation.city = city;
      orderCreation.county = county;
      orderCreation.post_code = postCode;
    }

    return orderCreation;
  }

  function renderCollectionCenterDetailsPanel() {
    return (
      <Fragment>
        <ThemedCard>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%"
            }}
          >
            <IconWithTextPanel
              icon={faBuilding}
              text={props.collectionPoint.name}
            />
            <IconWithTextPanel
              icon={faMapPin}
              text={AddressUtil.getFullAddressFormattedFromCollectionPoint(
                props.collectionPoint
              )}
            />
            <IconWithTextPanel
              icon={faShoppingBag}
              text={props.collectionPoint.available_capacity + " meals left"}
            />
          </View>
        </ThemedCard>
      </Fragment>
    );
  }

  function renderIftarPacksOptionPanel() {
    const options = [];
    for (let i = 1; i <= IFTAR_ORDER_LIMIT; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <Fragment>
        <ThemedCard>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <LightText>How many Iftar Packs?</LightText>
            <Form.Control
              as="select"
              value={iftarOrders}
              custom
              onChange={event => setIftarOrders(event.target.value)}
            >
              {options}
            </Form.Control>
          </View>
          <Form.Text className="text-muted">
            Please be mindful of others, and take only as much as you need.
          </Form.Text>
          <br/>
          <Form.Label>Dietary Requirements</Form.Label>
          <Form.Control
              as={"textarea"}
              required
              defaultValue={notes}
              onChange={event => setNotes(event.target.value)}
          />
        </ThemedCard>
      </Fragment>
    );
  }

  function renderDeliveryOptionsPanel() {
    return (
      <Fragment>
        <ThemedCard>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%"
            }}
          >
            {props.collectionPoint.accepting_collections &&
            <Form.Check
                name="collection-or-delivery"
                type={"radio"}
                label={"Collection"}
                id={"radio-collection"}
                onChange={onCollectionSelected}
                checked={isCollection}
            />
            }
            {props.collectionPoint.accepting_deliveries &&
            <Form.Check
                name="collection-or-delivery"
                type={"radio"}
                label={"Delivery"}
                id={"radio-delivery"}
                onChange={onDeliverySelected}
                checked={!isCollection}
            />
            }
          </View>
          <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                paddingTop: "30px"
              }}
          >
          {!isCollection && (
              <Fragment>
              <hr />
              <LightText>Delivery Details:</LightText>

              <Form.Text className="text-muted">
                Please only choose delivery if you have no other option,
                otherwise. We have a limited amount of time to be able to
                delivery to everyone and we want to make sure we can help those
                who are the most vulnerable.
              </Form.Text>

              <br />

              <Form.Label>
                Address Line 1 <small>(required)</small>
              </Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={addressLine1}
                onChange={event => setAddressLine1(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                We can't deliver without an address
              </Form.Control.Feedback>
              <br />

              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                as={"input"}
                value={addressLine2}
                onChange={event => setAddressLine2(event.target.value)}
              />
              <br />

              <Form.Label>City</Form.Label>
              <Form.Control
                as={"input"}
                value={city}
                onChange={event => setCity(event.target.value)}
              />
              <br />

              <Form.Label>County</Form.Label>
              <Form.Control
                as={"input"}
                value={county}
                onChange={event => setCounty(event.target.value)}
              />
              <br />

              <Form.Label>
                Postcode <small>(required)</small>
              </Form.Label>
              <Form.Control
                as={"input"}
                value={postCode}
                required
                onChange={event => setPostCode(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                We can't find your address without your postcode.
              </Form.Control.Feedback>

              <br />
              </Fragment>
          )}

          <Form.Label>
            Phone Number <small>(required)</small>
          </Form.Label>
          <Form.Control
              as={"input"}
              value={phone}
              required
              onChange={event => setPhone(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            We need your phone number so that we can contact you if we can't locate you.
          </Form.Control.Feedback>
          <br />
          </View>
        </ThemedCard>
      </Fragment>
    );
  }

  function renderSelectTimePanel() {
    const collectionPointTimes =
      props.collectionPoint.collection_point_time_slots;
    if (collectionPointTimes === null) {
      return <Error>Could not load collection times.</Error>;
    }
    const selectItems = collectionPointTimes
      .filter(timeslot => timeslot.type === "user_pickup")
      .map((collectionPointTime, i) => {
      return (
        <option key={collectionPointTime.id} value={i}>
          {collectionPointTime.start_time}
        </option>
      );
    });
    return (
      <Fragment>
        <ThemedCard>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%"
            }}
          >
            <LightText>Select time slot </LightText>
            <Form.Control
              as="select"
              value={selectedTimeSlotIndex}
              custom
              onChange={event => setSelectedTimeSlotIndex(event.target.value)}
            >
              {selectItems}
            </Form.Control>
          </View>
        </ThemedCard>
      </Fragment>
    );
  }

  function renderElements() {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error>{error}</Error>;
    } else {
      return (
        <Fragment>
          <Form ref={formRef} validated={isFormValidated}>
            {renderCollectionCenterDetailsPanel()}

            {renderIftarPacksOptionPanel()}

            {renderDeliveryOptionsPanel()}

            {renderSelectTimePanel()}

            <Button
              type={"button"}
              variant="primary"
              size={"lg"}
              block
              onClick={onOrderSubmit}
            >
              Submit Order
            </Button>
          </Form>

          {orderCreation != null && (
            <CreateOrderConfirmationDialogue
              onClose={onOrderCancel}
              token={props.token}
              orderCreation={orderCreation}
            />
          )}
        </Fragment>
      );
    }
  }

  if (props.collectionPoint === null) {
    return <Error>No collection point selected</Error>;
  } else {
    return (
      <PaddedScrollableYView>
        <Header
          title={"Create Order"}
          subtitle={
            "Now you've selected your centre, create your order here for collection or delivery"
          }
        />
        {renderElements()}
      </PaddedScrollableYView>
    );
  }
};

export default CreateOrderView;
