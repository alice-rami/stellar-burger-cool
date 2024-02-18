import { Ingredient } from '../../utils/types';

type AppProps = {
  ingredients: Ingredient[];
};

export const App = ({ ingredients }: AppProps) => {
  console.log(ingredients);
  return (
    <div>
      <p>Hello!</p>
      <p>Welcome to this lovely app!</p>
    </div>
  );
};
