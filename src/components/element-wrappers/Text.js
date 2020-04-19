import React from 'react';
import {COLOR_TEXT_DEFAULT} from '../../constants/theme';

function Text(props) {
  const color = props.color || COLOR_TEXT_DEFAULT;

  return (
      <div {...props} style={{...props.style, color: color}}/>
  )
}

export default Text;