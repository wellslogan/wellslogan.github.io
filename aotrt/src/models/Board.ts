import { IngredientName } from '.';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Board = {
  name: string;
  ingredients: IngredientName[];
  icon: IconProp;
};
