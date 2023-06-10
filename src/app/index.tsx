import React, { Suspense, lazy } from 'react';
import './index.scss';
import { Route, Routes } from 'react-router-dom';
import Loading from 'shared/ui';

const MainPage = lazy(() => import('../pages/main'));
const SignUpPage = lazy(() => import('../pages/signUp'));
const SignInPage = lazy(() => import('../pages/signIn'));
const HistoryPage = lazy(() => import('../pages/history'));
const NotFoundPage = lazy(() => import('../pages/notFound'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
