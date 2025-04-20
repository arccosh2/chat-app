import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserInfo } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseClient';

interface SerializableUserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserState {
  currentUser: SerializableUserInfo | null;
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: true,
};

const ACTION_TYPE = {
  FETCH_CURRENT_USER: 'auth/fetchCurrentUser',
};

const serializeUser = (user: UserInfo | null): SerializableUserInfo | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export const fetchCurrentUser = createAsyncThunk(
  ACTION_TYPE.FETCH_CURRENT_USER,
  async (_, { rejectWithValue }) => {
    try {
      return new Promise<SerializableUserInfo | null>((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe();
          resolve(serializeUser(user));
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
