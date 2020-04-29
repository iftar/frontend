import React, {Fragment, useState} from 'react';

import iftarImg from "../../assets/images/shareiftar-icon-13.png";
import {Button, Card, Container, Row} from 'react-bootstrap';
import View from '../../components/element-wrappers/View';
import ThemedCard from '../../components/cards/ThemedCard';
import CollectionPoint from '../../models/CollectionPoint';
import IconWithTextPanel from '../../components/icons/IconWithTextPanel';
import {faBox, faMapPin, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import Text from '../../components/element-wrappers/Text';
import AddressUtil from '../../util/AddressUtil';

type Props = {
  collectionPoint: CollectionPoint,

  onClick: (collectionPoint: CollectionPoint) => void,
}

function SingleCollectionPointView(props: Props) {
  const collectionPoint = props.collectionPoint;

  function onClick() {
    if (collectionPoint.accepting_orders) {
      props.onClick(collectionPoint);
    }
  }

  function collectionPointAdditionalInfoText() {
    if (collectionPoint.accepting_orders) {
      if (collectionPoint.accepting_deliveries && collectionPoint.accepting_collections)
        return "Collection and delivery available at this location.";
      else if (collectionPoint.accepting_deliveries)
        return "Only delivery available at this location.";
      else if (collectionPoint.accepting_collections)
        return "Only collection available at this location.";
    } else {
      return "Unfortunately, this collection point is no longer accepting orders.";
    }
  }

  return (
        <ThemedCard>
          <View style={{justifyContent: "space-around", alignItems: "center",  width: "100%", paddingTop: "10px", paddingBottom: "20px"}}>
            {/* <SingleCollectionImage/> */}
            <View onClick={onClick} style={{display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around", alignItems: "flex-start"}}>
              <Text style={{fontWeight: "bold", fontSize: "1.2em", paddingBottom: "15px"}}>{collectionPoint.name}</Text>
              {/*<IconWithTextPanel icon={faMapPin} text={collectionPoint} />*/}
              <IconWithTextPanel icon={faBox} text={collectionPoint.available_capacity + ' meals left'} />
              <IconWithTextPanel icon={faMapPin} text={AddressUtil.getFullAddressFormattedFromCollectionPoint(collectionPoint)} />
              <IconWithTextPanel icon={faInfoCircle} text={collectionPointAdditionalInfoText()} />
              <Button variant={"primary"} block onClick={onClick} disabled={!collectionPoint.accepting_orders}>Select</Button>
            </View>
          </View>
        </ThemedCard>
  );
}

function SingleCollectionImage() {
  return (
      <View style={{marginRight: "20px", maxWidth: "40%"}}>
        <img src={iftarImg} alt="collection point logo" style={{objectFit: "contain", maxHeight: "250px", maxWidth: "100%"}}/>
      </View>
  )
}

export default SingleCollectionPointView;
