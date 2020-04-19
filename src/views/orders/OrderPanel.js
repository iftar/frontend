import React, {Fragment} from 'react';
import {Button, Card} from 'react-bootstrap';
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

function OrderPanel(props) {

  const order = props.order;
  const onClick = props.onClick;

  const totalMeals = order.meals_adults + order.meals_children;

  return (
      <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingBottom: "20px"}}>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
                <CircleIcon icon={faMapPin}/>
                <LightText>{order.collection_point_id}</LightText>
              </View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingTop: "20px"}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
                  <CircleIcon icon={faBox}/>
                  <LightText>Iftar Pack x {totalMeals}</LightText>
                </View>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
                  <CircleIcon icon={faClock}/>
                  <LightText>{order.collection_point_timeslot_id}</LightText>
                </View>
              </View>
            </View>
            {onClick && <Button variant={"primary"} block>Edit</Button>}
          </Card.Body>
        </Card>
      </View>
  )
}

export default OrderPanel;