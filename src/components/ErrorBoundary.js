import Error from './Error';
import React from 'react';

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // this.setState({error: error});
    console.log("error", error);
  }

  render() {
    if (this.state.hasError) {
      return <Error>Oops, something unexpected happened here</Error>
    }
    return this.props.children;
    // return <Error>Oops, something unexpected happened here</Error>

  }
}

export default ErrorBoundary;