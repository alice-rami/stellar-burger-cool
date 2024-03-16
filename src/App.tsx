import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/ui/layout/component';
import { FeedPage } from './pages/feed-page/component';
import { DeviceProvider } from './device-context/component';
import { IngredientDetailsContainer } from './components/ingredient-details/container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ProfilePageContainer } from './pages/profile-page/container';
import { OnlyAuth, OnlyUnAuth } from './pages/protected-route/component';
import { LayoutProfile } from './components/ui/layout-profile/component';
import { LoginPageContainer } from './pages/login-page/container';
import { RegistrationPageContainer } from './pages/registration-page/container';
import { ForgotPasswordPageContainer } from './pages/forgot-password-page/container';
import { ResetPasswordPageContainer } from './pages/reset-password-page/container';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/rtkHooks';
import { checkUserAuthThunk } from './redux/ui/user/thunks/check-user-auth-thunk';
import { UserOrdersContainer } from './components/orders/orders/container-user';
import { OrderDetailsAllContainer } from './components/orders/order-details/container-all';
import { OrderDetailsUserContainer } from './components/orders/order-details/container-user';
import { ConstructorPageContainer } from './pages/constructor-page/container';
import ErrorBoundary from './error-boundary/error-boundary';
import { BASE } from './utils/constants-urls';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <DeviceProvider>
        <ErrorBoundary>
          <Routes>
            <Route path={`${BASE}`} element={<Layout />}>
              <Route path={`${BASE}`} element={<ConstructorPageContainer />} />
              <Route path='feed' element={<FeedPage />} />
              <Route path='feed/:id' element={<OrderDetailsAllContainer />} />
              <Route
                path='ingredients/:id'
                element={<IngredientDetailsContainer />}
              />
              <Route
                path={`${BASE}profile`}
                element={<OnlyAuth component={<LayoutProfile />} />}
              >
                <Route
                  path={`${BASE}profile`}
                  element={<OnlyAuth component={<ProfilePageContainer />} />}
                />
                <Route
                  path={`${BASE}profile/orders`}
                  element={<OnlyAuth component={<UserOrdersContainer />} />}
                />
                <Route
                  path={`${BASE}profile/orders/:id`}
                  element={
                    <OnlyAuth component={<OrderDetailsUserContainer />} />
                  }
                />
              </Route>

              <Route
                path='login'
                element={<OnlyUnAuth component={<LoginPageContainer />} />}
              />
              <Route
                path='register'
                element={
                  <OnlyUnAuth component={<RegistrationPageContainer />} />
                }
              />
              <Route
                path='forgot-password'
                element={
                  <OnlyUnAuth component={<ForgotPasswordPageContainer />} />
                }
              />
              <Route
                path='reset-password'
                element={
                  <OnlyUnAuth component={<ResetPasswordPageContainer />} />
                }
              />
              <Route path='*' element={<div>Not found</div>} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </DeviceProvider>
    </DndProvider>
  );
};
