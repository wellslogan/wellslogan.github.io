import React, { useMemo } from 'react';
import {
  Recipe,
  IngredientCosts,
  IngredientCost,
  IngredientName,
} from '../../models';
import { useSelector } from 'react-redux';
import { selectCosts, selectONumber } from '../../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/pro-duotone-svg-icons';

type Props = {
  recipe: Recipe;
  onClick: (name: IngredientName) => any;
};
export const RecipeComponent: React.FC<Props> = (props) => {
  const { recipe, onClick } = props;
  const costs = useSelector(selectCosts);
  const oNumber = useSelector(selectONumber);

  const recipeCost = useMemo(() => {
    if (
      !recipe.ingredients.every(
        (ing) => costs[ing]?.a !== undefined && costs[ing]?.b !== undefined,
      ) ||
      oNumber === undefined
    ) {
      return undefined;
    }

    const sum = recipe.ingredients.reduce((total, curIng) => {
      const { a, b } = costs[curIng] ?? {};
      return total + (a ?? 0) + (b ?? 0);
    }, 0);

    return sum - oNumber;
  }, [costs, recipe.ingredients, oNumber]);

  return (
    <div className="mb-4">
      <h2 className="text-xl">
        {recipe.name}
        {recipeCost !== undefined && <strong> (Cost: {recipeCost})</strong>}
      </h2>
      <ul>
        {recipe.ingredients.map((ing, idx) => {
          const { a, b } = costs[ing] ?? {};
          let costsString = '';
          if (a !== undefined && b !== undefined) {
            costsString = `(${a}, ${b})`;
          } else if (a !== undefined) {
            costsString = `(${a}, ???)`;
          } else if (b !== undefined) {
            costsString = `(???, ${b})`;
          }

          const bothDefined = a !== undefined && b !== undefined;
          const className = bothDefined
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';

          return (
            <li key={idx} className={className}>
              <FontAwesomeIcon
                className={bothDefined ? 'text-green-700' : 'text-red-700'}
                icon={bothDefined ? faCheckCircle : faTimesCircle}
              />{' '}
              <button className="hover:underline" onClick={() => onClick(ing)}>
                {ing}
              </button>
              <span className="opacity-75"> {costsString}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
