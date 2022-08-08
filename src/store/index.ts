import {
  configureStore,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { getAllUsers } from '../api/api';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { RootState } from '../react-app-env';
// import { RootState } from '../react-app-env';
// eslint-disable-next-line no-shadow
export enum ActionType {
  SET_ALL_USERS = 'SET_ALL_USERS',
}

// Initial state
const initialState: RootState = {
  users: [],
};

export const loadUsers = createAsyncThunk(ActionType.SET_ALL_USERS, async () => {
  const usersFromServer = await getAllUsers();

  return usersFromServer;
});

// rootReducer - this function is called after dispatching an action
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadUsers.fulfilled, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
// type of dispath, dispatch can get async function
export type AppDispatch = typeof store.dispatch;
