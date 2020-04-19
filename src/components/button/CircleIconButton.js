import React from 'react';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import View from '../element-wrappers/View';

function CircleIconButton(props) {
  const icon = props.icon || "";

  return (
      <View style={{borderRadius: "25%"}}>
        <Button variant={"primary"} {...props}><FontAwesomeIcon icon={icon}/></Button>
      </View>
  )
}

export default CircleIconButton;