import React, {Fragment} from 'react';
import LightText from './element-wrappers/LightText';
import View from './element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBatteryEmpty, faFrownOpen} from '@fortawesome/free-solid-svg-icons';
import {Button, Card} from 'react-bootstrap';
import {COLOR_PRIMARY} from '../constants/theme';
import ThemedCard from './cards/ThemedCard';

function NoItemsFound(props) {

  return (
      <Fragment>
        <View style={{marginTop: "10px", marginLeft: "5px", marginRight: "5px", width: "100%"}}>
          <ThemedCard style={{ width: '100%' }}>
              <View style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={faFrownOpen} color={COLOR_PRIMARY}></FontAwesomeIcon>
                <LightText>{"No items found"}</LightText>
              </View>
          </ThemedCard>
        </View>
      </Fragment>
  )
}

export default NoItemsFound;