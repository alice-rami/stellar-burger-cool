import { useGetIngredientsQuery } from '../../redux/services/ingredientApi';
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

  return <App ingredients={data} />;
};
