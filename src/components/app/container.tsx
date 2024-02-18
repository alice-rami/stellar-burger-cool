import { DeviceProvider } from '../../device-context/component';
import { useGetIngredientsQuery } from '../../redux/services/ingredientApi';
import { AppHeader } from '../app-header/component';
import Loader from '../loader/component';
import { App } from './component';

export const AppContainer = () => {
  const { data, isFetching } = useGetIngredientsQuery();
  if (isFetching) {
    return <Loader />;
  }

  if (!data) {
    return 'no data';
  }

  return (
    <div>
      <DeviceProvider>
        <AppHeader />
      </DeviceProvider>
      <App ingredients={data} />
    </div>
  );
};
