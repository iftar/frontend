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
  faTimes, faTruck, faWalking, faStore, faHeadSideMask,
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
  buttonText: string,
  onClick: (order: Order) => void,
}

function OrderPanel(props: Props) {

  const order = props.order;
  const onClick = props.onClick || null;

  const collectionPoint = order.collection_point;
  const collectionPointTimeSlot = order.collection_point_time_slot;

  return (
      <ErrorBoundary>
      <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
        <Fragment>
          <ThemedCard>
            <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingBottom: "20px"}}>
              <SubHeadingText style={{letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "bold", marginBottom: "10px"}}>Order number #{order.id}</SubHeadingText>
              <IconWithTextPanel icon={faTruck} text={"Delivery"}/>
              <IconWithTextPanel icon={faBuilding} text={collectionPoint.name}/>
              {order.isDelivery() ?
                  <IconWithTextPanel icon={faBicycle} text={AddressUtil.getFullAddressFormattedFromOrder(order)}/>
              :
                  <IconWithTextPanel icon={faMapPin} text={AddressUtil.getFullAddressFormattedFromCollectionPoint(collectionPoint)} />}
              <IconWithTextPanel icon={faBox} text={`Iftar Pack x ${order.quantity}`}/>
              {!order.isDelivery() &&
              <Fragment>
                <IconWithTextPanel icon={faClock} text={collectionPointTimeSlot.start_time}/>
                <IconWithTextPanel icon={faHeadSideMask} text={
                  "Please observe government social distancing when you arrive to collect your meals."
                }/>
              </Fragment>
              }
            </View>
            <Text style={{marginBottom: "20px"}}>If you need to edit your order please contact us on <a href={"mailto:shareiftar@gmail.com"}>shareiftar@gmail.com</a>.</Text>
            {(onClick != null && props.buttonText) && <Button variant={"outline-primary"} block onClick={props.onClick}>{props.buttonText}</Button>}
          </ThemedCard>
        </Fragment>
      </View>
      </ErrorBoundary>
  )
}

export default OrderPanel;