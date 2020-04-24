import ErrorBoundary from '../ErrorBoundary';
import React from 'react';
import View from '../element-wrappers/View';

function PaddedScrollableYView(props) {
  return (
      <ErrorBoundary>
        <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingBottom: '120px',
              paddingTop: '40px',
              paddingLeft: "15px",
              paddingRight: "15px",
              height: "100%",
              marginBottom: "100px",
              overflowY: "scroll"
            }}
            {...props}
        >
          {props.children}

        </View>
      </ErrorBoundary>
  );
}

export default PaddedScrollableYView;