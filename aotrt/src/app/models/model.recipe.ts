import { Ingredient } from './model.ingredient';

export class Recipe {
  constructor(public result: Ingredient, public ingredients: Ingredient[]) {    }
}