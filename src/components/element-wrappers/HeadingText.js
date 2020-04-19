import React from 'react';
import Text from './Text';
import {COLOR_PRIMARY, COLOR_TEXT_DEFAULT} from '../../constants/theme';

function HeadingText(props) {
  return (
      <Text style={{fontWeight: "bold", fontSize: "2em"}} {...props}/>
  )
}

export default HeadingText;