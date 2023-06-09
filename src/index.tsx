import App from 'app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'app/redux/store';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorComponent } from 'shared/ui';

const AppComponentWithErrorBoundary = withErrorBoundary(App, {
  fallback: <ErrorComponent />,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppComponentWithErrorBoundary />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
