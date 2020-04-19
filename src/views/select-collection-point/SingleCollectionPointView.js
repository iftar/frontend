import React, {Fragment, useState} from 'react';

import "./location.css";
import data from "./location-data.json";
import iftarImg from "../../assets/images/iftar.png";
import bluePin from "../../assets/images/bluepin.png";
import backBtn from "../../assets/images/back_btn.svg";
import {Button, Card, Container, Row} from 'react-bootstrap';
import CircleIconButton from '../../components/button/CircleIconButton';
import HeadingText from '../../components/element-wrappers/HeadingText';
import View from '../../components/element-wrappers/View';
import {useHistory} from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import OrdersTodayView from '../orders/OrdersTodayView';
import OrdersHistoryView from '../orders/OrdersHistoryView';
import ThemedCard from '../../components/cards/ThemedCard';
import CollectionPoint from '../../models/CollectionPoint';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import IconWithTextPanel from '../../components/icons/IconWithTextPanel';
import {faBox, faMapPin} from '@fortawesome/free-solid-svg-icons';
import Text from '../../components/element-wrappers/Text';

const locationList = data.data.collection_points.data;

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
      <View style={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
        <ThemedCard>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center",  width: "100%"}}>
            <SingleCollectionImage/>
            <View style={{display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around", alignItems: "flex-start"}}>
              <Text style={{fontWeight: "bold", fontSize: "1.2em", paddingBottom: "15px"}}>{collectionPoint.name}</Text>
              {/*<IconWithTextPanel icon={faMapPin} text={collectionPoint} />*/}
              <IconWithTextPanel icon={faBox} text={collectionPoint.max_daily_capacity + ' meals left'} />
              <Button variant={"primary"} block onClick={onClick}>Select</Button>
            </View>
          </View>

        </ThemedCard>
      </View>
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
