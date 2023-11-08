// authThunk.js
import { loginStart, loginSuccess, loginFailure, logout, setAuthLoading, setAuthError } from './authSlice';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    dispatch(setAuthLoading(true));

    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginFailure('Login failed. Please check your credentials.'));
    }
  } catch (error) {
    dispatch(loginFailure('Network error. Please try again later.'));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

// Thunk for logout
export const logoutUser = () => async (dispatch) => {
  dispatch(logout());
};

// Similarly, create a thunk for signup
// ...
