import React, {Fragment} from 'react';
import View from '../element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {COLOR_PRIMARY} from '../../constants/theme';

function CircleIcon(props) {
  const icon = props.icon;

  return (
      <Fragment>
        <View style={{borderRadius: "50%", minHeight: "40px", minWidth: "40px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: COLOR_PRIMARY, marginRight: "10px"}}>
          <FontAwesomeIcon icon={icon} color={"#FFFFFF"}></FontAwesomeIcon>
        </View>
      </Fragment>
  )
}

export default CircleIcon;