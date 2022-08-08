// eslint-disable-next-line import/extensions, import/no-unresolved
import { RootState } from '../react-app-env';

export const getUsersSelector = (state: RootState) => state.users;
export const getCurrentIdSelector = (state: RootState) => state.currentId;
export const getCurrentUserSelector = (state: RootState) => state.currentUser;
export const getModeSelector = (state: RootState) => state.mode;
