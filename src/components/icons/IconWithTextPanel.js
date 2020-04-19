import View from '../element-wrappers/View';
import CircleIcon from './CircleIcon';
import {faBox, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import LightText from '../element-wrappers/LightText';
import React from 'react';

type Props = {
  icon: IconDefinition,
  text: string
}

function IconWithTextPanel(props : Props) {
  return (
      <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", textAlign: "left", width: "100%", paddingBottom: "20px"}}>
        <CircleIcon icon={props.icon}/>
        <LightText>{props.text}</LightText>
      </View>
  )
}

export default IconWithTextPanel;