import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';

import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector((state) => state.ingredients.ingredients);

  if (!ingredientData) {
    return <Preloader />;
  }

  const selectedIngredient = ingredientData.find(
    (ingredient) => ingredient._id === id
  );

  if (!selectedIngredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};
