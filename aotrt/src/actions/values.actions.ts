import { IngredientName } from '../models';

export const ValueActionTypes = {
  SET_VALUE_A: 'VALUES:SET_VALUE_A',
  SET_VALUE_B: 'VALUES:SET_VALUE_B',
  CLEAR_VALUES: 'VALUES:CLEAR_VALUES',
  SET_O_NUMBER: 'VALUES:SET_O_NUMBER',
};

export const setValueA = (name: IngredientName, value?: number) => ({
  type: ValueActionTypes.SET_VALUE_A,
  name,
  value,
});

export const setValueB = (name: IngredientName, value?: number) => ({
  type: ValueActionTypes.SET_VALUE_B,
  name,
  value,
});

export const setONumber = (oNumber?: number) => ({
  type: ValueActionTypes.SET_O_NUMBER,
  oNumber,
});

export const clearValues = () => ({ type: ValueActionTypes.CLEAR_VALUES });
