import CircleIconButton from './button/CircleIconButton';
import HeadingText from './element-wrappers/HeadingText';
import View from './element-wrappers/View';
import React from 'react';
import {useHistory} from 'react-router-dom';

type Props = {
  title: string,
}

function Header(props : Props) {

  const history = useHistory();


  function onBackButtonClick() {
    history.goBack();
  }

  return (
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
  )
}

export default Header;