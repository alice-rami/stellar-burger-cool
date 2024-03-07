import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/ui/layout/component';
import { ConstructorPage } from './pages/constructor-page/component';
import { FeedPage } from './pages/feed-page/component';
import { DeviceProvider } from './device-context/component';
import { IngredientModalProvider } from './modal-context/component';
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

export const App = () => {
  const location = useLocation();
  const from: null | string = location.state && location.state.from;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <DeviceProvider>
        <Layout>
          <IngredientModalProvider>
            <Routes>
              <Route index element={<ConstructorPage />} />
              <Route path='feed' element={<FeedPage />} />
              <Route
                path='ingredients/:id'
                element={<IngredientDetailsContainer />}
              />
              <Route
                path='profile'
                element={<OnlyAuth component={<LayoutProfile />} />}
              >
                <Route
                  path='profile'
                  element={<OnlyUnAuth component={<ProfilePageContainer />} />}
                />
                {/* <Route
                      path='/profile/orders'
                      element={<OnlyAuth component={<OrdersHistory />} />}
                    /> */}
                {/* <Route
                      path='/profile/orders/:id'
                      element={
                        isModalOpen ? (
                          <OnlyAuth component={<OrdersHistory />} />
                        ) : (
                          <OnlyAuth component={<ReceivedOrderPageUser />} />
                        )
                      }
                    /> */}
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
                  <OnlyUnAuth
                    component={
                      from === 'forgot-password' ? (
                        <ResetPasswordPageContainer />
                      ) : (
                        <Navigate to={'/'} />
                      )
                    }
                  />
                }
              />
              <Route path='*' element={<div>Not found</div>} />
            </Routes>
          </IngredientModalProvider>
        </Layout>
      </DeviceProvider>
    </DndProvider>
  );
};
