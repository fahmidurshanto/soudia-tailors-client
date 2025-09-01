import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// You'll need to import your firebase config here
// import { auth } from '../../firebase/firebase.config';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Async thunk for signing in a user
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Replace this with your actual Firebase sign-in logic
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // return { uid: user.uid, email: user.email };
      console.log('Simulating sign in for', email, password);
      return { uid: '123', email: email }; // a mock user object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing up a user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Replace this with your actual Firebase sign-up logic
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // return { uid: user.uid, email: user.email };
      console.log('Simulating sign up for', email, password);
      return { uid: '123', email: email }; // a mock user object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing out a user
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Replace this with your actual Firebase sign-out logic
      // await signOut(auth);
      console.log('Simulating sign out');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
    },
    clearAuth: (state) => {
        state.user = null;
        state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign-in reducers
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign-up reducers
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign-out reducers
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
