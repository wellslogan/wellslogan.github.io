import { IngredientCosts, IngredientCost } from '../models';
import { ValueActionTypes } from '../actions/values.actions';

export type ValuesState = {
  costs: IngredientCosts;
  oNumber?: number;
};

const initialValuesState: ValuesState = {
  costs: {},
};

const addOrUpdateCost = (
  costs: IngredientCosts,
  key: keyof IngredientCost,
  name: keyof IngredientCosts,
  value: number,
): IngredientCosts => {
  return {
    ...costs,
    [name]: {
      ...(costs[name] ?? {}),
      [key]: value,
    },
  };
};

export const valuesReducer = (
  state: ValuesState = initialValuesState,
  action: any,
): ValuesState => {
  switch (action.type) {
    case ValueActionTypes.SET_VALUE_A:
      return {
        ...state,
        costs: addOrUpdateCost(state.costs, 'a', action.name, action.value),
      };
    case ValueActionTypes.SET_VALUE_B:
      return {
        ...state,
        costs: addOrUpdateCost(state.costs, 'b', action.name, action.value),
      };
    case ValueActionTypes.CLEAR_VALUES:
      return { ...state, costs: {} };
    case ValueActionTypes.SET_O_NUMBER:
      return { ...state, oNumber: action.oNumber };
    default:
      return state;
  }
};
