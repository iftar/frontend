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
import UserOrderCheck from '../../models/UserOrderCheck';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSadTear} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import {URL_CREATE_ORDER} from '../../constants/urls';
import {fetchCollectionPoints} from '../../store/collectionpoints/actions';

type Props = {
  collectionPoints: Array<CollectionPoint>,
  error: string,
  loading: boolean,
  userOrderCheck: UserOrderCheck,

  fetchUserOrderCheck: () => void,
  fetchCollectionPoints: () => void,
  selectCollectionLocation: (collectionPoint: CollectionPoint) => void,
}

function SelectCollectionPointView(props: Props) {

  const [collectionPoints, setCollectionPoints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canOrder : UserOrderCheck, setCanOrder] = useState(null);

  const history = useHistory();

  useEffect(() => {
    props.fetchUserOrderCheck()
  }, [null]);

  useEffect(() => {
    props.fetchCollectionPoints();
  }, [canOrder]);

  function onCollectionPointsSelected(collectionPoint: CollectionPoint) {
    props.selectCollectionLocation(collectionPoint);
    history.push(URL_CREATE_ORDER);
  }

  function renderElements() {
    if (props.loading) {
      return <Loading/>;
    } else if (props.error) {
      return <Error>{props.error}</Error>;
    }
    // else if (props.userOrderCheck != null && !props.userOrderCheck.user_can_order) {
    //   return (
    //       <View>
    //         <ThemedCard>
    //           <SubHeadingText><FontAwesomeIcon icon={faSadTear}/></SubHeadingText>
    //           <SubHeadingText>Sorry, but you cannot order right now.</SubHeadingText>
    //           <br/>
    //           {props.userOrderCheck.messages.map(m => <LightText key={m}>{m}</LightText>)}
    //         </ThemedCard>
    //       </View>
    //   )
    // }
    else {
      return (
          props.collectionPoints.map(collectionPoint =>
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
