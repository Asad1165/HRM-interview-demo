import { createSlice } from '@reduxjs/toolkit';
// utils

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated(state, action) {
      state.loading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function initialize() {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.authenticated(false));
    } catch (error) {
      console.error(error);
    }
  };
}
