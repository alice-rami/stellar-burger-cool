import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/component';
import { Provider } from 'react-redux';
import { store } from './redux';
import { ConstructorPage } from './pages/constructor-page/component';
import { FeedPage } from './pages/feed-page/component';
import { ProfilePage } from './pages/profile-page/component';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<ConstructorPage />} />
            <Route path='feed' element={<FeedPage />} />
            <Route path='profile' element={<ProfilePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};