import React, {Fragment, useEffect, useState} from 'react';

import {Card, Container, Row} from 'react-bootstrap';
import View from '../../components/element-wrappers/View';
import {useHistory} from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SingleCollectionPointView from './SingleCollectionPointView';
import CollectionPoint from '../../models/CollectionPoint';
import {
  fetchUserCanOrder,
  getCollectionPoints,
} from '../../util/api';
import ErrorBoundary from '../../components/ErrorBoundary';
import ThemedCard from '../../components/cards/ThemedCard';
import LightText from '../../components/element-wrappers/LightText';
import CanOrder from '../../models/CanOrder';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSadTear} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';

type Props = {
  onCollectionPointsSelected: (collectionPoint: CollectionPoint) => void,
}

function SelectCollectionPointView(props: Props) {

  const [collectionPoints, setCollectionPoints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canOrder : CanOrder, setCanOrder] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchUserCanOrder()
    .then(data => setCanOrder(data))
    .catch(e => setError(e.message))
    .finally(() => setLoading(false));
  }, [null]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCollectionPoints()
        .then(data => setCollectionPoints(data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
  }, [canOrder]);

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
    } else if (canOrder != null && !canOrder.user_can_order) {
      return (
          <View>
            <ThemedCard>
              <SubHeadingText><FontAwesomeIcon icon={faSadTear}/></SubHeadingText>
              <SubHeadingText>Sorry, but you cannot order right now.</SubHeadingText>
              <br/>
              {canOrder.messages.map(m => <LightText>{m}</LightText>)}
            </ThemedCard>
          </View>
      )
    } else {
      return (
          collectionPoints.map(collectionPoint =>
              <SingleCollectionPointView
                  key={collectionPoint.id}
                  collectionPoint={collectionPoint}
                  onClick={() => onCollectionPointsSelected(collectionPoint)}
              />)
      );
    }
  }

  return (

      <ErrorBoundary>
        <Container style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100%',
          paddingBottom: '40px',
          paddingTop: '40px',
        }}>
          <Header title={"Select Collection Point"}/>
          <View style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
            {renderElements()}
          </View>
        </Container>
      </ErrorBoundary>
  );
}

export default SelectCollectionPointView;
