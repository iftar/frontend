import React, {Fragment} from 'react';
import LightText from './element-wrappers/LightText';
import View from './element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBatteryEmpty} from '@fortawesome/free-solid-svg-icons';
import {Button, Card} from 'react-bootstrap';
import {COLOR_PRIMARY} from '../constants/theme';

function NoItemsFound(props) {

  return (
      <Fragment>
        <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <View style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={faBatteryEmpty} color={COLOR_PRIMARY}></FontAwesomeIcon>
                <LightText>{"No items found"}</LightText>
              </View>
            </Card.Body>
          </Card>
        </View>
      </Fragment>
  )
}

export default NoItemsFound;