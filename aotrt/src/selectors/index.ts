import { AppState } from '../models';

export const selectHiddenIngredients = (s: AppState) =>
  s.settings.hiddenIngredients;
export const selectCosts = (s: AppState) => s.values.costs;
export const selectONumber = (s: AppState) => s.values.oNumber;
