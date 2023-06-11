import React, { Suspense, lazy } from 'react';
import './index.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from 'shared/ui';
import { LS_KEYS } from 'shared';
import { setAuth } from './redux/authSlice';
import store from './redux/store';

const MainPage = lazy(() => import('../pages/main'));
const SignUpPage = lazy(() => import('../pages/signUp'));
const SignInPage = lazy(() => import('../pages/signIn'));
const HistoryPage = lazy(() => import('../pages/history'));
const FavoritesPage = lazy(() => import('../pages/favorites'));
const DetailsPage = lazy(() => import('../pages/details'));
const NotFoundPage = lazy(() => import('../pages/notFound'));

interface Props {
  children: JSX.Element | JSX.Element[];
}

const currentUser = localStorage[LS_KEYS.currentUser];
store.dispatch(setAuth(currentUser));

function PrivateRoute({ children }: Props) {
  const auth = store.getState().auth.user;
  return auth ? <div>{children}</div> : <Navigate to="/signin" />;
}

function PrivateRouteWhenLoggedIn({ children }: Props) {
  const auth = store.getState().auth.user;
  return !auth ? <div>{children}</div> : <Navigate to="/" />;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path=":search" element={<MainPage />} />
        </Route>
        <Route path="/bank/:id" element={<DetailsPage />} />
        <Route
          path="/signup"
          element={
            <PrivateRouteWhenLoggedIn>
              <SignUpPage />
            </PrivateRouteWhenLoggedIn>
          }
        />
        <Route
          path="/signin"
          element={
            <PrivateRouteWhenLoggedIn>
              <SignInPage />
            </PrivateRouteWhenLoggedIn>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
