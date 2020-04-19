import Error from './Error';
import React from 'react';

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState(error)
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (!this.state.error) {
      return this.props.children;
    } else {
      return <Error>Oops, something unexpected happened here</Error>
    }
  }
}

export default ErrorBoundary;