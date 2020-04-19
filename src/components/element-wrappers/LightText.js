import React from 'react';
import Text from './Text';

function LightText(props) {
  return (
      <Text style={{fontWeight: "bold", fontSize: "0.9em"}} {...props}/>
  )
}

export default LightText;