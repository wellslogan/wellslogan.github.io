import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/pro-duotone-svg-icons';
import {
  Board,
  IngredientCost,
  IngredientName,
  IngredientCosts,
} from '../../models';
import { toNumberOrDefault } from '../../utils';
import ReactTooltip from 'react-tooltip';

type Props = {
  board: Board;
  costs: IngredientCosts;
  onChange: (
    ingredientName: IngredientName,
    key: keyof IngredientCost,
    value: number | undefined,
  ) => any;
  onHide: (name: IngredientName) => any;
  hiddenIngredients: IngredientName[];
};
export const BoardComponent: React.FC<Props> = (props) => {
  const { board, costs, hiddenIngredients, onChange, onHide } = props;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ingredientName: IngredientName,
    key: keyof IngredientCost,
  ) => {
    const { value } = e.target;

    onChange(ingredientName, key, toNumberOrDefault(value));
  };

  return (
    <>
      <h3 className="mb-4 text-xl flex space-x-2 items-center text-gray-600">
        <FontAwesomeIcon icon={board.icon} />
        <span className="text-gray-800">{board.name} Board</span>
      </h3>
      <div className="bg-gray-800 rounded text-white px-4 pb-4 pt-8 mb-6">
        <div className="flex flex-wrap items-center">
          {board.ingredients.map((ingredient) => {
            const isHidden = hiddenIngredients.includes(ingredient);
            const style = { display: isHidden ? 'none' : undefined };
            return (
              <Fragment key={ingredient}>
                <div
                  className="w-1/3 mb-4"
                  style={style}
                  id={`ingredient_lbl_${ingredient}`}
                >
                  <button
                    className="appearance-none hover:text-gray-400"
                    onClick={() => onHide(ingredient)}
                    data-tip="Hide this ingredient from the board"
                  >
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>
                  &nbsp;&nbsp;
                  {ingredient}
                  <ReactTooltip place="top" type="dark" effect="solid" />
                </div>
                <div className="w-1/3 mb-4" style={style}>
                  <div className="px-2">
                    <input
                      className="border transition-colors duration-100 ease-in-out outline-0 border-transparent font-bold focus:bg-gray-200 focus:text-gray-700 placeholder-gray-400 focus:placeholder-gray-700 rounded-lg bg-gray-600 py-2 px-4 block w-full appearance-none leading-normal ds-input"
                      id={`ingredient_${ingredient}_val_a`}
                      type="number"
                      placeholder="Value A"
                      value={costs[ingredient]?.a}
                      onChange={(e) => handleChange(e, ingredient, 'a')}
                    />
                  </div>
                </div>
                <div className="w-1/3 mb-4" style={style}>
                  <div className="px-2">
                    <input
                      className="border transition-colors duration-100 ease-in-out outline-0 border-transparent font-bold focus:bg-gray-200 focus:text-gray-700 placeholder-gray-400 focus:placeholder-gray-700 rounded-lg bg-gray-600 py-2 px-4 block w-full appearance-none leading-normal ds-input"
                      id={`ingredient_${ingredient}_val_b`}
                      type="number"
                      placeholder="Value B"
                      value={costs[ingredient]?.b}
                      onChange={(e) => handleChange(e, ingredient, 'b')}
                    />
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
