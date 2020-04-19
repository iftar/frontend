import React, {Fragment, useState} from 'react';
import View from './element-wrappers/View';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {useInterval} from 'react-use';
import LightText from './element-wrappers/LightText';
import {Spinner} from 'react-bootstrap';
import {COLOR_PRIMARY} from '../constants/theme';

function Loading() {
  const DEFAULT_LOADING_TEXT = "Loading";

  const [loadingText, setLoadingText] = useState(DEFAULT_LOADING_TEXT);

  useInterval(() => {
    if (loadingText.endsWith("...")) {
      setLoadingText(DEFAULT_LOADING_TEXT)
    } else {
      setLoadingText(loadingText + ".");
    }
  }, 300);

  return (
      <Fragment>
        <View style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", color:{COLOR_PRIMARY}}}>
          <Spinner animation="border" variant={"primary"} />
          <LightText>{loadingText}</LightText>
        </View>
      </Fragment>
  )
}

export default Loading;