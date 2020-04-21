import React, {Fragment} from 'react';
import View from '../element-wrappers/View';
import './card.css'

function ThemedCard(props) {
  const title = props.title;
  const backgroundColor = props.backgroundColor || "white";
  return (
        <View className="card card-signin" style={{ width: "100%", marginBottom: "40px", backgroundColor: backgroundColor}}>
          <View className="card-body" style={{ width: "100%"}}>
            {props.children}
          </View>
        </View>
  )
}

export default ThemedCard;