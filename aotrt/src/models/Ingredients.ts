export type IngredientName =
  | 'Acetaldehyde'
  | 'Glycerol'
  | 'Methylbenzene'
  | 'Nitrated Glycerol Solution'
  | 'Mixed Acid'
  | 'Plant Food'
  | 'Paint'
  | 'Vinegar'
  | 'Ice'
  | 'Bleach'
  | 'Powdered Milk'
  | 'Fat'
  | 'Motor Oil'
  | 'Wheel Cleaner'
  | 'Table Salt'
  | 'Racing Fuel'
  | 'Insect Repellant'
  | 'Vodka'
  | 'Baking Soda'
  | 'Detergent'
  | 'Food Coloring'
  | 'Drain Opener'
  | 'Quarters'
  | 'Glass Cleaner'
  | 'Nail Polish Remover'
  | 'Pennies'
  | 'Pool Cleaner'
  | 'Hexamine'
  | 'Phenosulfonic Acid'
  | 'Phenol'
  | 'Aldehyde Sludge'
  | 'Formeldahyde'
  | 'Dinitro';

export type IngredientCost = {
  a?: number;
  b?: number;
};

export type IngredientCosts = {
  [key in IngredientName]?: IngredientCost;
};
