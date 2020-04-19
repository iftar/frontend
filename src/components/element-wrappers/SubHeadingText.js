import React from 'react';
import Text from './Text';

function SubHeadingText(props) {
  return (
      <Text style={{fontWeight: "bold", fontSize: "1.6em"}}>{props.children}</Text>
  )
}

export default SubHeadingText;