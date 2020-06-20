import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';
import { AllIngredients } from '../../constants';
import { IngredientName } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import { selectHiddenIngredients } from '../../selectors';
import { toggleHidden, setHidden } from '../../actions/settings.actions';
import AboutModal from '../Modal/AboutModal';

type Props = {
  onGoTo: (name: IngredientName) => any;
};
export const Header: React.FC<Props> = (props) => {
  const { onGoTo } = props;

  const [showResults, setShowResults] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const dispatch = useDispatch();
  const search = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    setSelectedIndex(0);
    if (value) setShowResults(true);
  };

  const handleSelect = (name: IngredientName) => {
    setShowResults(false);
    dispatch(setHidden(name, false));
    setTimeout(() => onGoTo(name), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const filtered = AllIngredients.filter((ing) =>
      ing.toLowerCase().includes(query.toLowerCase()),
    );
    if (e.key === 'Enter' && query) {
      search.current?.blur();
      handleSelect(filtered[selectedIndex]);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => Math.min(filtered.length - 1, prev + 1));
      e.preventDefault();
    }
  };

  const handleSlashKey = (e: KeyboardEvent) => {
    if (e.key === '/') {
      search.current?.focus();
      search.current?.select();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleSlashKey);

    return () => document.removeEventListener('keydown', handleSlashKey);
  }, []);

  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center border-b-2 border-gray-100 py-4">
            <div className="flex space-x-10">
              <h1 className="text-base leading-6 font-medium text-gray-700">
                Attack of the Radioactive Thing:
                <br />
                <span className="text-gray-600">Chemistry Calculator 2.0</span>
              </h1>
            </div>
            <div className="relative hidden md:flex md:flex-1">
              <input
                className="mx-10 transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-4 block w-full appearance-none leading-normal ds-input"
                id="jumpToIngredient"
                type="text"
                placeholder={'Jump to ingredient (Press "/" to focus)'}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={search}
              />
              {showResults && (
                <SearchResults
                  query={query}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelect}
                />
              )}
            </div>
            <div className="flex items-center flex-1 md:flex-none justify-end">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => AboutModal({})}
                  className="space-x-2 whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>About</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchResults: React.FC<any> = (props) => {
  const { query, selectedIndex, onSelect } = props;
  const lcQuery = query?.toLowerCase();

  const hiddenIngredients = useSelector(selectHiddenIngredients);

  if (!query) return null;

  return (
    <div className="absolute top-full w-full mt-2">
      <div className=" mx-10 bg-white shadow-lg border border-gray-200 rounded-md">
        <ul className="py-2">
          {AllIngredients.filter((ingredient) =>
            ingredient.toLowerCase().includes(lcQuery),
          ).map((ingredient, i) => {
            const lcIngredient = ingredient.toLowerCase();
            const idx = lcIngredient.indexOf(lcQuery);
            const firstPart = ingredient.substring(0, idx);
            const highlighted = (
              <strong className="text-indigo-600">
                {ingredient.slice(idx, idx + query.length)}
              </strong>
            );
            const lastPart = ingredient.substring(idx + query.length);
            const className = 'px-2 py-2 hover:bg-indigo-100';
            const isHidden = hiddenIngredients.includes(ingredient);
            return (
              <li
                key={ingredient}
                className={
                  i === selectedIndex ? `${className} bg-indigo-100` : className
                }
              >
                <button
                  className="block w-full text-left"
                  onClick={() => onSelect(ingredient)}
                >
                  {firstPart}
                  {highlighted}
                  {lastPart}
                  {isHidden && (
                    <em> (Ingredient hidden. Press Enter to show and go to)</em>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
