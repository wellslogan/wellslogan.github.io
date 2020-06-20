import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';

import { valuesReducer, settingsReducer } from './reducers';

const valuesPersistConfig = {
  key: 'values',
  storage: sessionStorage,
};

const settingsPersistConfig = {
  key: 'settings',
  storage: storage,
};

const rootReducer = combineReducers({
  values: persistReducer(valuesPersistConfig, valuesReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducer),
});

// const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  const store = createStore(rootReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
