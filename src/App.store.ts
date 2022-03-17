import { configureStore } from '@reduxjs/toolkit';
import usersReducer from `components/Dashboard.slice`

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
