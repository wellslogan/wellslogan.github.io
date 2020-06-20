import { ValuesState } from '../reducers/values.reducer';
import { SettingsState } from '../reducers/settings.reducer';

export type AppState = {
  values: ValuesState;
  settings: SettingsState;
};
