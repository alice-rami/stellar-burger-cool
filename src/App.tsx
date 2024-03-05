import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/ui/layout/component';
import { Provider } from 'react-redux';
import { store } from './redux';
import { ConstructorPage } from './pages/constructor-page/component';
import { FeedPage } from './pages/feed-page/component';
import { ProfilePage } from './pages/profile-page/component';
import { DeviceProvider } from './device-context/component';
import { IngredientModalProvider } from './modal-context/component';
import { IngredientDetailsContainer } from './components/ingredient-details/container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <DeviceProvider>
            <Layout>
              <IngredientModalProvider>
                <Routes>
                  <Route index element={<ConstructorPage />} />
                  <Route path='feed' element={<FeedPage />} />
                  <Route path='profile' element={<ProfilePage />} />
                  <Route
                    path='ingredients/:id'
                    element={<IngredientDetailsContainer />}
                  />
                  <Route path='*' element={<div>Not found</div>} />
                </Routes>
              </IngredientModalProvider>
            </Layout>
          </DeviceProvider>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  );
};
