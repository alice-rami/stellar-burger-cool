import './index.css';
import { createRoot } from 'react-dom/client';
import { AppContainer } from './components/app/container';
import { Provider } from 'react-redux';
import { store } from './redux';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
