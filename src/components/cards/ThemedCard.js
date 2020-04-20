import React, {Fragment} from 'react';
import View from '../element-wrappers/View';
import './card.css'

function ThemedCard(props) {
  const title = props.title;
  return (
        <View className="card card-signin" style={{ width: "100%", height:"100%", marginBottom: "40px"}}>
          <View className="card-body" style={{ width: "100%", height:"100%"}}>
            {props.children}
          </View>
        </View>
  )
}

export default ThemedCard;