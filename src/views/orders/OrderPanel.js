import React, {Fragment} from 'react';
import {Button} from 'react-bootstrap';
import View from '../../components/element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Text from '../../components/element-wrappers/Text';
import {
  faBicycle,
  faBox, faBuilding,
  faClock,
  faLocationArrow, faMapPin,
  faTimes, faTruck, faWalking,
} from '@fortawesome/free-solid-svg-icons';
import CircleIcon from '../../components/icons/CircleIcon';
import LightText from '../../components/element-wrappers/LightText';
import ThemedCard from '../../components/cards/ThemedCard';
import AddressUtil from '../../util/AddressUtil';
import Order from '../../models/Order';
import ErrorBoundary from '../../components/ErrorBoundary';
import IconWithTextPanel from '../../components/icons/IconWithTextPanel';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';

type Props = {
  order: Order,
}

function OrderPanel(props: Props) {

  const order = props.order;
  const onClick = props.onClick;

  const collectionPoint = order.collection_point;
  const collectionPointTimeSlot = order.collection_point_time_slot;

  function renderOrderForDelivery() {
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingBottom: "20px"}}>
              <SubHeadingText style={{letterSpacing: "0.2em", textTransform: "uppercase", fontStyle: "italic"}}>Delivery</SubHeadingText>
              <IconWithTextPanel icon={faBuilding} text={collectionPoint.name}/>
              <IconWithTextPanel icon={faBicycle} text={AddressUtil.getFullAddressFormattedFromOrder(order)}/>

              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingTop: "20px"}}>
                <IconWithTextPanel icon={faBox} text={`Iftar Pack x ${order.quantity}`}/>
              </View>
            </View>
            {onClick && <Button variant={"secondary"} block disabled>Edit</Button>}
          </ThemedCard>
        </Fragment>
    )

  }

  function renderOrderForCollection() {
    return (
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingBottom: "20px"}}>
              <SubHeadingText style={{letterSpacing: "0.2em", textTransform: "uppercase", fontStyle: "italic"}}>Collection</SubHeadingText>
              <IconWithTextPanel icon={faBuilding} text={collectionPoint.name}/>
              <IconWithTextPanel icon={faMapPin} text={AddressUtil.getFullAddressFormattedFromCollectionPoint(collectionPoint)}/>

              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingTop: "20px"}}>
                <IconWithTextPanel icon={faBox} text={`Iftar Pack x ${order.quantity}`}/>
                <IconWithTextPanel icon={faClock} text={collectionPointTimeSlot.start_time}/>
              </View>
            </View>
            {onClick && <Button variant={"secondary"} block disabled>Edit</Button>}
          </ThemedCard>
        </Fragment>
    )
  }

  return (
      <ErrorBoundary>
      <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
          {order.isDelivery() ? renderOrderForDelivery() : renderOrderForCollection()}
      </View>
      </ErrorBoundary>
  )
}

export default OrderPanel;