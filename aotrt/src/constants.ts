import { Board, IngredientName, Recipe } from './models';
import {
  faBroadcastTower,
  faCaravan,
  faUmbrellaBeach,
  faMapMarkerAlt,
  faStoreAlt,
  faGarage,
} from '@fortawesome/pro-duotone-svg-icons';

export const AllIngredients: IngredientName[] = [
  'Acetaldehyde',
  'Glycerol',
  'Methylbenzene',
  'Nitrated Glycerol Solution',
  'Mixed Acid',
  'Plant Food',
  'Paint',
  'Vinegar',
  'Ice',
  'Bleach',
  'Powdered Milk',
  'Fat',
  'Motor Oil',
  'Wheel Cleaner',
  'Table Salt',
  'Racing Fuel',
  'Insect Repellant',
  'Vodka',
  'Baking Soda',
  'Detergent',
  'Food Coloring',
  'Drain Opener',
  'Quarters',
  'Glass Cleaner',
  'Nail Polish Remover',
  'Pennies',
  'Pool Cleaner',
  'Hexamine',
  'Phenosulfonic Acid',
  'Phenol',
  'Aldehyde Sludge',
  'Formeldahyde',
  'Dinitro',
];

export const Boards: Board[] = [
  {
    name: 'TV Station',
    icon: faBroadcastTower,
    ingredients: [
      'Acetaldehyde',
      'Glycerol',
      'Methylbenzene',
      'Nitrated Glycerol Solution',
      'Mixed Acid',
    ],
  },
  {
    name: 'Trailer Park',
    icon: faCaravan,
    ingredients: [
      'Plant Food',
      'Paint',
      'Vinegar',
      'Ice',
      'Bleach',
      'Powdered Milk',
    ],
  },
  {
    name: 'Beach',
    icon: faUmbrellaBeach,
    ingredients: ['Fat', 'Motor Oil', 'Wheel Cleaner', 'Table Salt'],
  },
  {
    name: 'Spawn Room',
    icon: faMapMarkerAlt,
    ingredients: [
      'Racing Fuel',
      'Insect Repellant',
      'Vodka',
      'Baking Soda',
      'Detergent',
      'Food Coloring',
    ],
  },
  {
    name: 'Beachside Market Rear',
    icon: faStoreAlt,
    ingredients: [
      'Drain Opener',
      'Quarters',
      'Glass Cleaner',
      'Nail Polish Remover',
      'Pennies',
      'Pool Cleaner',
    ],
  },
  {
    name: 'Garage',
    icon: faGarage,
    ingredients: [
      'Hexamine',
      'Phenosulfonic Acid',
      'Phenol',
      'Aldehyde Sludge',
      'Formeldahyde',
      'Dinitro',
    ],
  },
];

let recipesList = [
  ['Acetaldehyde', 'Vodka', 'Pennies'],
  ['Glycerol', 'Fat', 'Vodka'],
  ['Methylbenzene', 'Paint', 'Drain Opener', 'Detergent'],
  ['Nitrated Glycerol Solution', 'Mixed Acid', 'Glycerol'],
  ['Mixed Acid', 'Detergent', 'Drain Opener', 'Ice'],
  ['Hexamine', 'Glass Cleaner', 'Formeldahyde'],
  ['Phenosulfonic Acid', 'Phenol', 'Drain Opener'],
  ['Phenol', 'Wheel Cleaner', 'Motor Oil', 'Insect Repellant'],
  ['Aldehyde Sludge', 'Formeldahyde', 'Acetaldehyde', 'Detergent'],
  ['Formeldahyde', 'Racing Fuel', 'Quarters'],
  ['Dinitro', 'Methylbenzene', 'Baking Soda', 'Vinegar', 'Detergent'],
  ['3-methyl-2,4-di-nitrobenzene', 'Dinitro', 'Racing Fuel'],
  ['3,4-di-nitroxy-methyl-propane', 'Aldehyde Sludge', 'Nail Polish Remover'],
  [
    'Octa-hydro-2,5-nitro-3,4,7-para-zokine',
    'Detergent',
    'Hexamine',
    'Plant Food',
    'Vinegar',
  ],
  ['1,3,5-tera-nitra-phenol', 'Detergent', 'Phenosulfonic Acid'],
];

export const Recipes: Recipe[] = [
  { name: 'Acetaldehyde', ingredients: ['Vodka', 'Pennies'] },
  { name: 'Glycerol', ingredients: ['Fat', 'Vodka'] },
  {
    name: 'Methylbenzene',
    ingredients: ['Paint', 'Drain Opener', 'Detergent'],
  },
  {
    name: 'Nitrated Glycerol Solution',
    ingredients: ['Mixed Acid', 'Glycerol'],
  },
  { name: 'Mixed Acid', ingredients: ['Detergent', 'Drain Opener', 'Ice'] },
  { name: 'Hexamine', ingredients: ['Glass Cleaner', 'Formeldahyde'] },
  { name: 'Phenosulfonic Acid', ingredients: ['Phenol', 'Drain Opener'] },
  {
    name: 'Phenol',
    ingredients: ['Wheel Cleaner', 'Motor Oil', 'Insect Repellant'],
  },
  {
    name: 'Aldehyde Sludge',
    ingredients: ['Formeldahyde', 'Acetaldehyde', 'Detergent'],
  },
  { name: 'Formeldahyde', ingredients: ['Racing Fuel', 'Quarters'] },
  {
    name: 'Dinitro',
    ingredients: ['Methylbenzene', 'Baking Soda', 'Vinegar', 'Detergent'],
  },
  {
    name: '3-methyl-2,4-di-nitrobenzene',
    ingredients: ['Dinitro', 'Racing Fuel'],
  },
  {
    name: '3,4-di-nitroxy-methyl-propane',
    ingredients: ['Aldehyde Sludge', 'Nail Polish Remover'],
  },
  {
    name: 'Octa-hydro-2,5-nitro-3,4,7-para-zokine',
    ingredients: ['Detergent', 'Hexamine', 'Plant Food', 'Vinegar'],
  },
  {
    name: '1,3,5-tera-nitra-phenol',
    ingredients: ['Detergent', 'Phenosulfonic Acid'],
  },
];
