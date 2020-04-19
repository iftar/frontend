import React, {Fragment} from 'react';
import View from './element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle, faInfo} from '@fortawesome/free-solid-svg-icons';
import LightText from './element-wrappers/LightText';

function Error(props) {
  return (
      <Fragment>
        <View style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <FontAwesomeIcon icon={faExclamationCircle} size={"lg"} color={"red"}></FontAwesomeIcon>
          <LightText>{props.children}</LightText>
        </View>
      </Fragment>
  )
}

export default Error;