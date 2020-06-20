import { IngredientName } from '../models';

export const SettingsActionTypes = {
  TOGGLE_HIDDEN: 'SETTINGS:TOGGLE_HIDDEN',
  RESET_HIDDEN: 'SETTINGS:RESET_HIDDEN',
  SET_HIDDEN: 'SETTINGS:SET_HIDDEN',
};

export const toggleHidden = (name: IngredientName) => ({
  type: SettingsActionTypes.TOGGLE_HIDDEN,
  name,
});

export const setHidden = (name: IngredientName, hidden: boolean) => ({
  type: SettingsActionTypes.SET_HIDDEN,
  name,
  hidden,
});

export const resetHidden = () => ({ type: SettingsActionTypes.RESET_HIDDEN });
