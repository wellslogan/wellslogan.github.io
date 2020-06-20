import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-duotone-svg-icons';
import { createModal } from 'react-modal-promise';

type Props = {
  isOpen: boolean;
  onResolve: (...params: any[]) => any;
};
const Modal: React.FC<Props> = (props) => {
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
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-700 sm:mx-0 sm:h-10 sm:w-10">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-xl leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Reset calculator?
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-600">
                  Are you sure you want to reset all chemical calculator values?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              onClick={() => onResolve(true)}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Reset
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              onClick={() => onResolve(false)}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default createModal(Modal);
