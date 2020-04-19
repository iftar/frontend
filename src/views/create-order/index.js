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
import {URL_SELECT_LOCATION} from '../../constants/urls';
import LightText from '../../components/element-wrappers/LightText';
import ErrorBoundary from '../../components/ErrorBoundary';
import Error from '../../components/Error';
import Logger from '../../util/Logger';

type Props = {
  collectionPoint: CollectionPoint
}

const CreateOrder = (props : Props) => {
  const logger = new Logger(CreateOrder.name);
  const IFTAR_ORDER_LIMIT = 10;

  const collectionPoint = props.collectionPoint;

  const [iftarOrderQuantities, setIftarOrderQuantities] = useState(null);

  const [iftarOrders, setIftarOrders] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [deliveryOrCollection, setDeliveryOrCollection] = useState(null);
  const [isCollection, setIsCollection] = useState(true);
  const [time, setTime] = useState(null)
  const [address, setAddress] = useState(null)

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

  function onOrderSubmit() {

  }

  function onIftarPacksSelectChange(e) {
    logger.info("onIftarPacksSelectChange", e)
  }

  function onCollectionSelected() {
    setIsCollection(true);
  }

  function onDeliverySelected() {
    setIsCollection(false);
  }

  function CollectionCenterDetailsPanel() {
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "column", width: "100%"}}>
              <IconWithTextPanel icon={faMapPin} text={CollectionPointAddressUtil.getFullAddressFormatted(collectionPoint)}/>
              <IconWithTextPanel icon={faShoppingBag} text={collectionPoint.max_daily_capacity + ' meals left'}/>
            </View>
          </ThemedCard>
        </Fragment>
    )
  }

  function IftarPacksOptionPanel() {
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <LightText>How many Iftar Packs?</LightText>
              <Form>
                  <Form.Control
                      as="select"
                      value={iftarOrders}
                      custom
                      onSelect={(value) => setIftarOrders(value)}
                  >
                    {iftarOrderQuantities !== null && iftarOrderQuantities.map(amount => (
                        <option value={amount}>{amount}</option>
                    ))}
                  </Form.Control>
              </Form>
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
          </ThemedCard>
        </Fragment>
    )
  }

  function SelectTimePanel() {
    const collectionPointTimes = collectionPoint.collection_point_time_slots;
    if (collectionPointTimes === null) {
      return <Error>Could not load collection times.</Error>;
    }
    const selectItems = collectionPointTimes.map(collectionPointTime => <option value={collectionPointTime.id}>{collectionPointTime.start_time}</option>)
    selectItems.push(<option selected value={null}>Select Time Slot</option>)
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%"}}>
              <Form style={{width: "100%"}}>
                <Form.Control
                    as="select"
                    value={selectedTimeSlot} custom
                    onSelect={(value) => setSelectedTimeSlot(value)}>
                  {selectItems.reverse()}
                </Form.Control>
              </Form>
            </View>
          </ThemedCard>
        </Fragment>
    )
  }

  if (props.collectionPoint === null) {
    return <Error>No collection point selected</Error>;
  } else {
    return (
        <ErrorBoundary>
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", paddingBottom: "40px" }}>
          <View style={{ display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center" }}>
            <CircleIconButton onClick={onBackButtonClick} />
            <HeadingText style={{ fontWeight: "bold", fontSize: "2em" }}>{collectionPoint.name}</HeadingText>
          </View>

          <CollectionCenterDetailsPanel collectionPoint={collectionPoint}/>

          <IftarPacksOptionPanel/>

          <DeliveryOptionsPanel/>

          <SelectTimePanel/>

          <Button variant="primary" onClick={onOrderSubmit}>Submit</Button>

        </Container>
        </ErrorBoundary>
    );
  }

};

export default CreateOrder
