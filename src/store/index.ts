import {
  configureStore,
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { getAllUsers, getUser } from '../api/api';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { RootState } from '../react-app-env';
// import { RootState } from '../react-app-env';
// eslint-disable-next-line no-shadow
export enum ActionType {
  SET_ALL_USERS = 'SET_ALL_USERS',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_MODE = 'SET_MODE',
}

// Initial state
const initialState: RootState = {
  users: [],
  currentUser: undefined,
  mode: true,
};

export const setMode = createAction<boolean>(ActionType.SET_MODE);

export const loadUsers = createAsyncThunk(ActionType.SET_ALL_USERS, async () => {
  const usersFromServer = await getAllUsers();

  return usersFromServer;
});

export const loadUser = createAsyncThunk(ActionType.SET_CURRENT_USER,
  async (currentId: number | undefined) => {
    const userFromServer = await getUser(currentId);

    return userFromServer;
  });

// rootReducer - this function is called after dispatching an action
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadUsers.fulfilled, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
  });

  builder.addCase(loadUser.fulfilled, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentUser = action.payload;
  });

  builder.addCase(setMode, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.mode = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
// type of dispath, dispatch can get async function
export type AppDispatch = typeof store.dispatch;
