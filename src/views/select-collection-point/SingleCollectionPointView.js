import React, {Fragment, useState} from 'react';

import iftarImg from "../../assets/images/iftar.png";
import {Button, Card, Container, Row} from 'react-bootstrap';
import View from '../../components/element-wrappers/View';
import ThemedCard from '../../components/cards/ThemedCard';
import CollectionPoint from '../../models/CollectionPoint';
import IconWithTextPanel from '../../components/icons/IconWithTextPanel';
import {faBox, faMapPin} from '@fortawesome/free-solid-svg-icons';
import Text from '../../components/element-wrappers/Text';
import AddressUtil from '../../util/AddressUtil';

type Props = {
  collectionPoint: CollectionPoint,

  onClick: (collectionPoint: CollectionPoint) => void,
}

function SingleCollectionPointView(props: Props) {
  const collectionPoint = props.collectionPoint;

  function onClick() {
    props.onClick(collectionPoint);
  }

  return (
        <ThemedCard>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center",  width: "100%", height: "300px"}}>
            <SingleCollectionImage/>
            <View style={{display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around", alignItems: "flex-start"}}>
              <Text style={{fontWeight: "bold", fontSize: "1.2em", paddingBottom: "15px"}}>{collectionPoint.name}</Text>
              {/*<IconWithTextPanel icon={faMapPin} text={collectionPoint} />*/}
              <IconWithTextPanel icon={faBox} text={collectionPoint.max_daily_capacity + ' meals left'} />
              <IconWithTextPanel icon={faMapPin} text={AddressUtil.getFullAddressFormattedFromCollectionPoint(collectionPoint)} />
              <Button variant={"primary"} block onClick={onClick}>Select</Button>
            </View>
          </View>

        </ThemedCard>
  );
}

function SingleCollectionImage() {
  return (
      <View style={{marginRight: "20px", maxWidth: "40%"}}>
        <img src={iftarImg} alt="Iftar" width={"100%"} height={"100%"} style={{objectFit: "contain"}}/>
      </View>
  )
}

export default SingleCollectionPointView;
