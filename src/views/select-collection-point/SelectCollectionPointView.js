import React, {Fragment, useEffect, useState} from 'react';

import {Button, Card, Container, Form, InputGroup, Row} from 'react-bootstrap';
import View from '../../components/element-wrappers/View';
import {useHistory} from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SingleCollectionPointView from './SingleCollectionPointView';
import CollectionPoint from '../../models/CollectionPoint';
import ErrorBoundary from '../../components/ErrorBoundary';
import UserOrderCheck from '../../models/UserOrderCheck';
import Header from '../../components/Header';
import {URL_CREATE_ORDER} from '../../constants/urls';
import PaddedScrollableYView
  from '../../components/views/PaddedScrollableYView';
import {fetchCurrentLocation} from '../../store/location/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faLocationArrow,
  faSadTear,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {fetchCollectionPointsNearMe} from '../../store/collectionpoints/actions';
import isEmpty from 'lodash-es/isEmpty';
import NoItemsFound from '../../components/NoItemsFound';
import ThemedCard from '../../components/cards/ThemedCard';
import SubHeadingText from '../../components/element-wrappers/SubHeadingText';
import LightText from '../../components/element-wrappers/LightText';
import {useDebounce} from 'react-use';
import debounce from 'lodash-es/debounce';

type Props = {
  collectionPoints: Array<CollectionPoint>,
  error: string,
  loading: boolean,
  userOrderCheck: UserOrderCheck,
  locationCoordinates: {latitude: number, longitude:number},
  locationError: string,
  locationLoading: boolean,

  fetchUserOrderCheck: () => void,
  fetchCollectionPoints: () => void,
  selectCollectionLocation: (collectionPoint: CollectionPoint) => void,
  fetchCurrentLocation: () => void,
  fetchCollectionPointsNearMe: () => void,
}

function SelectCollectionPointView(props: Props) {

  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [postcode, setPostcode] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const history = useHistory();

  useEffect(() => {
    props.fetchUserOrderCheck();
    fetchCurrentLocation();
  }, [null]);

  useEffect(() => {
    // if (props.locationError || isEmpty(props.locationCoordinates)) {
    //   props.fetchCollectionPoints();
    // } else {
    //   props.fetchCollectionPointsNearMe();
    // }
  }, [props.userOrderCheck]);

  useEffect(() => {
    if (props.userOrderCheck != null && props.userOrderCheck.user_can_order) {
      if(!isEmpty(postcode)) {
        props.fetchCollectionPointsNearMe(postcode);
      } else if (showAll) {
        props.fetchCollectionPoints();
      }
    }
  }, [props.locationCoordinates, props.userOrderCheck, showAll, postcode]);

  function onCollectionPointsSelected(collectionPoint: CollectionPoint) {
    props.selectCollectionLocation(collectionPoint);
    history.push(URL_CREATE_ORDER);
  }

  const onPostcodeChange = debounce( (value) => {
    setPostcode(value);
    setShowAll(false);
  }, 400);

  function renderElements() {
    if (props.loading || props.locationLoading) {
      return <Loading/>;
    } else if (props.error) {
      return <Error>{props.error}</Error>;
    }
    else if (props.userOrderCheck != null && !props.userOrderCheck.user_can_order) {
      return (
          <View>
            <ThemedCard>
              <SubHeadingText><FontAwesomeIcon icon={faSadTear}/></SubHeadingText>
              <SubHeadingText>Sorry, but you cannot order right now.</SubHeadingText>
              <br/>
              {props.userOrderCheck.messages.map(m => <LightText key={m}>{m}</LightText>)}
            </ThemedCard>
          </View>
      )
    }
    else if (isEmpty(postcode) && !showAll) {
      return (
          <View>
            <ThemedCard>
              <LightText>Enter a postcode</LightText>
              <br/>
              <LightText>Or alternatively, click below to show all collection points.</LightText>
              <br/>
              <Button size={"sm"} variant={"outline-secondary"} block onClick={() => setShowAll(true)}>Show All</Button>
            </ThemedCard>
          </View>
      )
    }
    else if (isEmpty(props.collectionPoints)) {
      return <NoItemsFound message={"No collection points found"}/>
    }
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
      <PaddedScrollableYView>
        <Header title={"Select Collection Point"} subtitle={"Firstly, lets pick a centre where you'd like to collect food from"}/>
        <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-start", alignItems: "center", marginBottom: "40px", marginTop: "20px"}}>
          {/*<Button variant={useCurrentLocation ?"primary-outline" :  "primary"} size={"lg"} block onClick={() => setUseCurrentLocation(!useCurrentLocation)}>*/}
          {/*  {props.locationLoading ? <FontAwesomeIcon icon={faSpinner} spin/> : <FontAwesomeIcon icon={faLocationArrow}/>} &nbsp;*/}
          {/*  { useCurrentLocation ? "Disable Current Location" : "Enable Current Location"}*/}
          {/*</Button>*/}
          <Form.Control type="input" placeholder="Enter your postcode..." size={"lg"} onChange={(event) => onPostcodeChange(event.target.value)} />
        </View>
        <View style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-start", alignItems: "center", marginBottom: "100px"}}>
          {renderElements()}
        </View>
      </PaddedScrollableYView>
  );
}

export default SelectCollectionPointView;
