import React, {Fragment} from 'react';
import {Button} from 'react-bootstrap';
import View from '../../components/element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Text from '../../components/element-wrappers/Text';
import {
  faBox,
  faClock,
  faLocationArrow, faMapPin,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CircleIcon from '../../components/icons/CircleIcon';
import LightText from '../../components/element-wrappers/LightText';
import ThemedCard from '../../components/cards/ThemedCard';
import CollectionPointAddressUtil from '../../util/CollectionPointAddressUtil';
import Order from '../../models/Order';
import ErrorBoundary from '../../components/ErrorBoundary';

type Props = {
  order: Order,
}

function OrderPanel(props: Props) {

  const order = props.order;
  const onClick = props.onClick;

  const collectionPoint = order.collection_point;
  const collectionPointTimeSlot = order.collection_point_time_slot;

  return (
      <ErrorBoundary>
      <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
        <ThemedCard style={{ width: '100%' }}>
          <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingBottom: "20px"}}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
              <CircleIcon icon={faMapPin}/>
              <LightText>{CollectionPointAddressUtil.getFullAddressFormatted(collectionPoint)}</LightText>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingTop: "20px"}}>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
                <CircleIcon icon={faBox}/>
                <LightText>Iftar Pack x {order.quantity}</LightText>
              </View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
                <CircleIcon icon={faClock}/>
                <LightText>{collectionPointTimeSlot.start_time}</LightText>
              </View>
            </View>
          </View>
          {onClick && <Button variant={"primary"} block disabled>Edit</Button>}
        </ThemedCard>
      </View>
      </ErrorBoundary>
  )
}

export default OrderPanel;