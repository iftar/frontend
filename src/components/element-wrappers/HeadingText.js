import React from 'react';
import Text from './Text';

function HeadingText(props) {
  return (
      <Text style={{fontWeight: "bold", fontSize: "2em"}}>{props.children}</Text>
  )
}

export default HeadingText;