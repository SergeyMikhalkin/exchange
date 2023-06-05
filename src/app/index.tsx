import React, { Suspense, lazy } from 'react';
import './index.scss';
import { Route, Routes } from 'react-router-dom';
import Loading from 'shared/ui';

const SignUpPage = lazy(() => import('../pages/signUp'));
const SignInPage = lazy(() => import('../pages/signIn'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
