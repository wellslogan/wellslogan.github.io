import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, BoardComponent, RecipeComponent } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLink,
  faFlask,
  faUsdCircle,
  faTrashAlt,
} from '@fortawesome/pro-duotone-svg-icons';
import { Boards, Recipes } from './constants';
import { AppState, IngredientCost, IngredientName } from './models';
import {
  setValueA,
  setValueB,
  setONumber,
  clearValues,
} from './actions/values.actions';
import { toggleHidden, resetHidden } from './actions/settings.actions';
import oNumberIcon from './assets/o_number.png';
import { selectONumber, selectCosts } from './selectors';
import ModalContainer from 'react-modal-promise';
import confirmModal from './components/Modal/ConfirmResetModal';

const App: React.FC = () => {
  const costs = useSelector(selectCosts);
  const oNumber = useSelector(selectONumber);
  const hiddenIngredients = useSelector(
    (s: AppState) => s.settings.hiddenIngredients,
  );
  const dispatch = useDispatch();
  const coachmark = useRef<HTMLDivElement>(null);
  const [showCoachmark, setShowCoachmark] = useState<boolean>(false);

  const handleValueChange = (
    ingredient: IngredientName,
    key: keyof IngredientCost,
    value?: number,
  ) => {
    if (key === 'a') {
      dispatch(setValueA(ingredient, value));
    } else {
      dispatch(setValueB(ingredient, value));
    }
  };

  const handleHide = (name: IngredientName) => {
    dispatch(toggleHidden(name));
  };

  const handleShowAll = () => {
    dispatch(resetHidden());
  };

  const handleGoTo = (name: IngredientName) => {
    const id = `ingredient_lbl_${name}`;
    const el = document.getElementById(id);
    if (el) {
      const { offsetTop } = el;
      window.scrollTo({
        top: offsetTop - window.innerHeight / 2,
        behavior: 'smooth',
      });
      if (coachmark.current) {
        coachmark.current.style.top = `${offsetTop}px`;
        const col = document.getElementById('ingredientValuesColumn');
        if (col) {
          coachmark.current.style.left = `${
            col.offsetLeft + col.offsetWidth - 10
          }px`;
        }

        const valA = document.getElementById(
          `ingredient_${name}_val_a`,
        ) as HTMLInputElement;
        const valB = document.getElementById(
          `ingredient_${name}_val_b`,
        ) as HTMLInputElement;

        if (valA && !valA.value) {
          valA.focus();
        } else if (valB && !valB.value) {
          valB.focus();
        }

        setShowCoachmark(true);

        // setTimeout(() => setShowCoachmark(false), 4_000);
      }
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (showCoachmark) {
      setShowCoachmark(false);
    }
  };

  const handleReset = () =>
    confirmModal({}).then((confirmed) => {
      if (confirmed) {
        dispatch(clearValues());
        dispatch(setONumber(undefined));
        window.location.reload();
      }
    });

  const handleONumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setONumber(value ? parseFloat(value) : undefined));
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  });

  return (
    <>
      <ModalContainer />
      <div
        id="coachmark"
        className="absolute z-10 w-12 h-6 bg-indigo-600 text-white"
        style={{
          display: showCoachmark ? undefined : 'none',
          animation: 'move_coachmark 0.5s ease-in-out 0s infinite alternate',
        }}
        ref={coachmark}
      ></div>
      <Header onGoTo={handleGoTo} />
      <div className="max-w-6xl mx-auto px-4 my-4 sm:px-6">
        <div
          className="bg-green-100 rounded text-green-700 px-4 py-3"
          role="alert"
        >
          <div className="flex space-x-4 items-center">
            <FontAwesomeIcon icon={faExternalLink} />
            <p className="leading-6">
              <a
                className="underline hover:text-green-900 transition duration-500 ease-in-out"
                href="https://docs.google.com/document/d/1_Zco-XbZJb_d4o6J0FrKH-wj2NTK5-z0wsEUOow6ISY/edit#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Information & Recipes sourced from the /r/codzombies community
                guide hosted by /u/The_Kronorium
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 my-4 sm:px-6 flex flex-wrap ">
        <p className="leading-6 text-gray-700">
          {hiddenIngredients.length ? (
            <>
              Hiding {hiddenIngredients.length} ingredient
              {hiddenIngredients.length === 1 ? '' : 's'}.{' '}
              <button
                onClick={handleShowAll}
                className="appearance-none underline hover:text-indigo-400 transition-colors duration-500 ease-in-out"
              >
                Click here to show all.
              </button>
            </>
          ) : (
            'Not hiding any ingredients.'
          )}
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 my-4 sm:px-6 flex flex-wrap ">
        <div className="w-full md:w-1/2 md:pr-4" id="ingredientValuesColumn">
          <h2 className="mb-6 font-bold text-2xl flex space-x-4 items-center text-gray-600">
            <FontAwesomeIcon icon={faFlask} />
            <span className="text-gray-800">Ingredient values</span>
            <button
              onClick={handleReset}
              className="space-x-2 whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition ease-in-out duration-150"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              <span>Clear all</span>
            </button>
          </h2>
          <div className="flex mb-6 space-x-4 items-center">
            <img src={oNumberIcon} alt="O Number" />
            <span> = </span>
            <input
              type="number"
              className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 px-4 block w-full appearance-none leading-normal ds-input"
              value={oNumber}
              onChange={handleONumberChange}
              placeholder={'Enter "O" number'}
            />
          </div>
          {Boards.map((board) => (
            <BoardComponent
              key={board.name}
              board={board}
              costs={costs}
              hiddenIngredients={hiddenIngredients}
              onChange={handleValueChange}
              onHide={handleHide}
            />
          ))}
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h2 className="mb-6 text-2xl font-bold flex space-x-4 items-center text-gray-600">
            <FontAwesomeIcon icon={faUsdCircle} />
            <span className="text-gray-800">Recipes and costs</span>
          </h2>
          {Recipes.map((recipe) => (
            <RecipeComponent
              recipe={recipe}
              key={recipe.name}
              onClick={handleGoTo}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
