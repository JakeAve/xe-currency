import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: string;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error): void {
    this.setState({ hasError: true });
    this.props?.onError?.(error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) return <div>{this.props.errorMessage}</div>;

    return this.props.children;
  }
}
