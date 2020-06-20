import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-duotone-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { createModal } from 'react-modal-promise';

type Props = {
  isOpen: boolean;
  onResolve: (...params: any[]) => any;
};
const AboutModal: React.FC<Props> = (props) => {
  const { isOpen, onResolve } = props;
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed z-20 bg-gray-900 bg-opacity-25 bottom-0 inset-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 sm:mx-0 sm:h-10 sm:w-10">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-xl leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                About the calculator
              </h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm leading-5 text-gray-600">
                  AOTRT Chemical Calculator v2.0.0
                </p>
                <h3 className="text-lg leading-6">Changelog</h3>
                <p className="text-sm leading-6">
                  <strong>2.0.0 | 2020-06-20 </strong>
                </p>
                <ul className="text-sm leading-6 list-disc ml-8 mb-4 text-gray-700">
                  <li className="py-2">
                    UI rewrite with React &{' '}
                    <a
                      href="https://tailwindcss.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-900 transition ease-in-out duration-500"
                    >
                      TailwindCSS
                    </a>
                    .
                  </li>
                  <li className="py-1">
                    Added ability to hide ingredients from the board.
                  </li>
                  <li className="py-1">
                    Ingredient values are now stored in sessionStorage so they
                    will persist in the event of an accidental reload.
                  </li>
                  <li className="py-1">
                    Added "Jump to" search feature for quick keyboard navigation
                    to ingredients and their values.
                  </li>
                </ul>
                <hr />
                <p className="text-sm leading-6 text-gray-900">
                  Suggestions, issues, corrections? Message{' '}
                  <a
                    href="https://reddit.com/u/wellslogan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-900 transition ease-in-out duration-500"
                  >
                    /u/wellslogan
                  </a>{' '}
                  on reddit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              onClick={() => onResolve(false)}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Close
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default createModal(AboutModal);
