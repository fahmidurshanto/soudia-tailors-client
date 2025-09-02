import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase/firebase.config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

// Async thunk for signing in a user
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token for backend authentication
      const idToken = await user.getIdToken();
      
      return { 
        uid: user.uid, 
        email: user.email,
        displayName: user.displayName,
        idToken: idToken
      };
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Provide Bengali error messages
      let errorMessage = 'লগইন করতে সমস্যা হয়েছে';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'এই ইমেইল দিয়ে কোন অ্যাকাউন্ট পাওয়া যায়নি';
          break;
        case 'auth/wrong-password':
          errorMessage = 'ভুল পাসওয়ার্ড দেওয়া হয়েছে';
          break;
        case 'auth/invalid-email':
          errorMessage = 'ইমেইল ঠিকানা সঠিক নয়';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'অনেকবার চেষ্টা করা হয়েছে। একটু পরে আবার চেষ্টা করুন';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'ইন্টারনেট সংযোগ চেক করুন';
          break;
        default:
          errorMessage = error.message || 'লগইন করতে সমস্যা হয়েছে';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for signing up a user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token for backend authentication
      const idToken = await user.getIdToken();
      
      return { 
        uid: user.uid, 
        email: user.email,
        displayName: user.displayName,
        idToken: idToken
      };
    } catch (error) {
      console.error('Sign up error:', error);
      
      // Provide Bengali error messages
      let errorMessage = 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে';
          break;
        case 'auth/invalid-email':
          errorMessage = 'ইমেইল ঠিকানা সঠিক নয়';
          break;
        case 'auth/weak-password':
          errorMessage = 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে';
          break;
        default:
          errorMessage = error.message || 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for signing out a user
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      console.error('Sign out error:', error);
      return rejectWithValue('লগআউট করতে সমস্যা হয়েছে');
    }
  }
);

// Async thunk for checking auth state
export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const idToken = await user.getIdToken();
            const userData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              idToken: idToken
            };
            resolve(userData);
          } catch (error) {
            console.error('Error getting ID token:', error);
            resolve(null);
          }
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    });
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start with loading true for auth state check
  error: null,
  idToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.idToken = action.payload?.idToken || null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.idToken = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
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
        state.idToken = action.payload.idToken;
        state.error = null;
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
        state.idToken = action.payload.idToken;
        state.error = null;
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
        state.idToken = null;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check auth state reducers
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.idToken = action.payload.idToken;
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.idToken = null;
        }
        state.error = null;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.idToken = null;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearAuth, clearError } = authSlice.actions;

export default authSlice.reducer;
