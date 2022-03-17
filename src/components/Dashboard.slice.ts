import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  status: 'loading',
  entities: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
      const user = action.payload;
      state.entities[user.id] = user;
    },
    userUpdated(state, action) {
      const { id } = action.payload;
      state.entities[id] = action.payload;
    },
    userDeleted(state, action) {
      delete state.entities[action.payload];
    },
    usersLoading(state) {
      state.status = 'loading';
    },
    usersLoaded(state, action) {
      const newEntities = {};
      action.payload.forEach((user) => {
        newEntities[user.id] = user;
      });
      state.entities = newEntities;
      state.status = 'idle';
    },
  },
});

export const { userAdded, userUpdated, userDeleted, usersLoaded, usersLoading } = usersSlice.actions;

const selectUserEntities = (state) => state.users.entities;

export const selectUsers = createSelector(selectUserEntities, (entities) => Object.values(entities));

// Async Actions
export const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading());
  const response = await fetcher('/users');
  dispatch(usersLoaded(response));
};

export function saveNewUser(userData) {
  return async function saveNewUserThunk(dispatch, getState) {
    await fetcher('/users', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    dispatch(userAdded(userData));
  };
}

export function saveUser(userData) {
  return async function saveUserThunk(dispatch, getState) {
    await fetcher(`/users/${userData.id}`, {
      // we expect 500 because its fake api
      method: 'PUT',
      body: JSON.stringify(userData),
    }).catch(() => userData);
    dispatch(userUpdated(userData));
  };
}
export function deleteUser(userData) {
  return async function deleteUserThunk(dispatch, getState) {
    await fetcher(`/users/${userData.id}`, { method: 'DELETE' }).catch(() => userData);
    dispatch(userDeleted(userData.id));
  };
}

const fetcher = (resource: string, init?: any) =>
  fetch(import.meta.env.VITE_API_BASE_URL + resource, init).then((res) => res.json());

export default usersSlice.reducer;
