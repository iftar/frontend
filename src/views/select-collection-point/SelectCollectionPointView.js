import React, {Fragment, useEffect, useState} from 'react';

import "./location.css";
import data from "./location-data.json";
import iftarImg from "../../assets/images/iftar.png";
import bluePin from "../../assets/images/bluepin.png";
import backBtn from "../../assets/images/back_btn.svg";
import {Card, Container, Row} from 'react-bootstrap';
import CircleIconButton from '../../components/button/CircleIconButton';
import HeadingText from '../../components/element-wrappers/HeadingText';
import View from '../../components/element-wrappers/View';
import {useHistory} from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import OrdersTodayView from '../orders/OrdersTodayView';
import OrdersHistoryView from '../orders/OrdersHistoryView';
import SingleCollectionPointView from './SingleCollectionPointView';
import CollectionPoint from '../../models/CollectionPoint';
import {getCollectionPoints} from '../../util/api';

type Props = {
  onCollectionPointsSelected: (collectionPoint: CollectionPoint) => void,
}

function SelectCollectionPointView(props: Props) {

  const [collectionPoints, setCollectionPoints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCollectionPoints()
        .then(data => setCollectionPoints(data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
  }, [null]);

  function onBackButtonClick() {
    history.goBack();
  }

  function onCollectionPointsSelected(collectionPoint: CollectionPoint) {
    props.onCollectionPointsSelected(collectionPoint);
  }

  function renderElements() {
    if (loading) {
      return <Loading/>;
    } else if (error) {
      return <Error>{error}</Error>;
    } else {
      return (
          <Fragment>
            {collectionPoints.map(collectionPoint => <SingleCollectionPointView
                collectionPoint={collectionPoint}
                onClick={() => onCollectionPointsSelected(collectionPoint)}
            />)}
          </Fragment>
      );
    }
  }

  return (
    <Container style={{display: "flex", flexDirection: "column", alignItems: "center", height: "100%", paddingBottom: "40px"}}>
      <View style={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
        <CircleIconButton onClick={onBackButtonClick}/>
        <HeadingText style={{fontWeight: "bold", fontSize: "2em"}}>Select a Collection Point</HeadingText>
      </View>
      <View style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center"}}>
        {renderElements()}
      </View>
    </Container>
  );
}

export default SelectCollectionPointView;
