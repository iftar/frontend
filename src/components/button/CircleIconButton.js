import React from 'react';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import View from '../element-wrappers/View';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function CircleIconButton(props) {
  const icon = props.icon || faChevronLeft;

  return (
      <Button variant={"primary"} style={{borderRadius: "50%", marginRight: "20px"}} {...props}><FontAwesomeIcon icon={icon}/></Button>
  )
}

export default CircleIconButton;