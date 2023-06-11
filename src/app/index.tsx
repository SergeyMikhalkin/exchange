import React, { Suspense, createContext, lazy, useMemo, useState } from 'react';
import './index.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from 'shared/ui';
import { getFavoritesFromLocalStorage } from 'shared';
import { useSelector } from 'react-redux';
import { getUserAuth } from './redux/authSlice';
import store from './redux/store';
import { fillFavorites } from './redux/banksSlice';


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

export function PrivateRoute({ children }: Props) {
  const auth = useSelector(getUserAuth);
  return auth ? <div>{children}</div> : <Navigate to="/signin" />;
};

export function PrivateRouteWhenLoggedIn({ children }: Props) {
  const auth = useSelector(getUserAuth);
  return !auth ? <div>{children}</div> : <Navigate to="/" />;
};

export type ContextType = {
  darkBG: boolean;
  setDarkBG: (c: boolean) => void;
};

export const BackgroundContext = createContext<ContextType>({
  darkBG: false,
  setDarkBG: () => {},
});

export const fillFavoritesToStore = () => {
  const favorites = getFavoritesFromLocalStorage();
  store.dispatch(fillFavorites(favorites));
};

fillFavoritesToStore();

function App() {
  const [darkBG, setDarkBG] = useState(false);

  const memoValue = useMemo(() => ({ darkBG, setDarkBG }), [darkBG]);

  return (
    <BackgroundContext.Provider value={memoValue}>
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
    </BackgroundContext.Provider>
  );
}

export default App;
