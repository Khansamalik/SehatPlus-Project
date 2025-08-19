import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Global ErrorBoundary caught error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFF8F0] text-center">
          <h1 className="text-2xl font-bold text-[#6C0B14] mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4 text-sm max-w-md">An unexpected error occurred while rendering this page. We've logged it to the console. You can try reloading the app.</p>
          {this.state.error && (
            <pre className="text-xs bg-white border rounded p-3 max-w-lg overflow-auto text-left mb-4">
{String(this.state.error.message || this.state.error)}
            </pre>
          )}
          <button onClick={this.handleReload} className="bg-[#6C0B14] text-white px-4 py-2 rounded hover:bg-[#8a0f1a]">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
