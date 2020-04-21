import CircleIconButton from './button/CircleIconButton';
import HeadingText from './element-wrappers/HeadingText';
import View from './element-wrappers/View';
import React from 'react';
import {useHistory} from 'react-router-dom';
import LightText from './element-wrappers/LightText';

type Props = {
  title: string,
  subtitle: ?string,
}

function Header(props : Props) {

  const history = useHistory();


  function onBackButtonClick() {
    history.goBack();
  }

  return (
      <View style={{
        display: 'flex',
        flexDirection: "column",
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: "15px",
      }}>
      <View style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: "10px",
      }}>
        <CircleIconButton onClick={onBackButtonClick}/>
        <HeadingText style={{fontWeight: 'bold', fontSize: '2em'}}>{props.title}</HeadingText>
      </View>

        {props.subtitle && <LightText style={{fontStyle: "italic"}}>{props.subtitle}</LightText>}
      </View>
  )
}

export default Header;