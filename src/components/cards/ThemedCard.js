import React, {Fragment} from 'react';
import View from '../element-wrappers/View';
import './card.css'

function ThemedCard(props) {
  const title = props.title;
  return (
      <Fragment>
        <View className="card card-signin" style={{ width: "100%", marginBottom: "40px"}}>
          <View className="card-body">
            {props.children}
          </View>
        </View>
      </Fragment>
  )
}

export default ThemedCard;