import { SettingsActionTypes } from '../actions/settings.actions';
import { IngredientName } from '../models';

export type SettingsState = {
  hiddenIngredients: IngredientName[];
};

const initialSettingsState: SettingsState = {
  hiddenIngredients: [],
};

export const settingsReducer = (
  state: SettingsState = initialSettingsState,
  action: any,
): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.TOGGLE_HIDDEN:
      return {
        ...state,
        hiddenIngredients: state.hiddenIngredients.includes(action.name)
          ? state.hiddenIngredients.filter((i) => i !== action.name)
          : [...state.hiddenIngredients, action.name],
      };
    case SettingsActionTypes.SET_HIDDEN: {
      return {
        ...state,
        hiddenIngredients: action.hidden
          ? [...state.hiddenIngredients, action.name]
          : state.hiddenIngredients.filter((i) => i !== action.name),
      };
    }
    case SettingsActionTypes.RESET_HIDDEN:
      return { ...state, hiddenIngredients: [] };
    default:
      return state;
  }
};
