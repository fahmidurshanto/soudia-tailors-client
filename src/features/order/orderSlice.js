// src/features/order/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../auth/authSlice'; // Correct import path

// Use environment variable for backend URL or default to https://order-taking-app-backend.onrender.com
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://https://order-taking-app-backend.onrender.com';

// Create async thunk for submitting order
export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      console.log('Submitting order data:', orderData); // Debug log
      
      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      console.log('Response status:', response.status); // Debug log
      
      // Check if response is OK
      if (!response.ok) {
        // Try to parse error response as JSON
        try {
          const errorData = await response.json();
          console.log('Error response:', errorData); // Debug log
          return rejectWithValue(errorData.message || 'Server error');
        } catch (jsonError) {
          // If JSON parsing fails, return a generic error message
          return rejectWithValue(`Server error: ${response.status} ${response.statusText}`);
        }
      }
      
      // Parse successful response
      const data = await response.json();
      console.log('Success response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Network error:', error); // Debug log
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Fetch orders from backend
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      // Get the token from the auth state
      const { auth } = getState();
      let token = auth.idToken; // Firebase ID token is stored in idToken field
      
      // If we have a user, try to refresh the token
      if (auth.user && auth.user.uid) {
        try {
          // Import Firebase auth dynamically to avoid issues
          const { getAuth } = await import('firebase/auth');
          const firebaseAuth = getAuth();
          const user = firebaseAuth.currentUser;
          
          if (user) {
            // Refresh the ID token
            token = await user.getIdToken(true);
            // Update the token in the auth state
            dispatch(setUser({ ...auth.user, idToken: token }));
          }
        } catch (refreshError) {
          console.warn('Could not refresh token:', refreshError);
          // Continue with existing token if refresh fails
        }
      }
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'GET',
        headers,
      });
      
      // Check if response is OK
      if (!response.ok) {
        // Try to parse error response as JSON
        try {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || 'Server error');
        } catch (jsonError) {
          // If JSON parsing fails, return a generic error message
          return rejectWithValue(`Server error: ${response.status} ${response.statusText}`);
        }
      }
      
      // Parse successful response
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue, getState }) => {
    try {
      // Get the token from the auth state
      const { auth } = getState();
      let token = auth.idToken; // Firebase ID token is stored in idToken field
      
      // If we have a user, try to refresh the token
      if (auth.user && auth.user.uid) {
        try {
          // Import Firebase auth dynamically to avoid issues
          const { getAuth } = await import('firebase/auth');
          const firebaseAuth = getAuth();
          const user = firebaseAuth.currentUser;
          
          if (user) {
            // Refresh the ID token
            token = await user.getIdToken(true);
          }
        } catch (refreshError) {
          console.warn('Could not refresh token:', refreshError);
          // Continue with existing token if refresh fails
        }
      }
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      });
      
      // Check if response is OK
      if (!response.ok) {
        // Try to parse error response as JSON
        try {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || 'Server error');
        } catch (jsonError) {
          // If JSON parsing fails, return a generic error message
          return rejectWithValue(`Server error: ${response.status} ${response.statusText}`);
        }
      }
      
      // Parse successful response
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Update order
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderId, orderData }, { rejectWithValue, getState }) => {
    try {
      // Get the token from the auth state
      const { auth } = getState();
      let token = auth.idToken; // Firebase ID token is stored in idToken field
      
      // If we have a user, try to refresh the token
      if (auth.user && auth.user.uid) {
        try {
          // Import Firebase auth dynamically to avoid issues
          const { getAuth } = await import('firebase/auth');
          const firebaseAuth = getAuth();
          const user = firebaseAuth.currentUser;
          
          if (user) {
            // Refresh the ID token
            token = await user.getIdToken(true);
          }
        } catch (refreshError) {
          console.warn('Could not refresh token:', refreshError);
          // Continue with existing token if refresh fails
        }
      }
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(orderData),
      });
      
      // Check if response is OK
      if (!response.ok) {
        // Try to parse error response as JSON
        try {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || 'Server error');
        } catch (jsonError) {
          // If JSON parsing fails, return a generic error message
          return rejectWithValue(`Server error: ${response.status} ${response.statusText}`);
        }
      }
      
      // Parse successful response
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    customerData: {
      name: '',
      phone: '',
      address: '',
      totalAmount: ''
    },
    measurements: {
      length: '',
      body: '',
      waist: '',
      hip: '',
      leg: '',
      armLength: '',
      armWidth: '',
      bottomRound: '',
      additionalNotes: '',
      sketchData: null // Base64 image data from canvas
    },
    designReferences: {
      capturedImages: [], // Array of Cloudinary image objects from camera
      uploadedFiles: [], // Array of Cloudinary file objects
      designNotes: '' // Special design instructions
    },
    orders: [], // Store fetched orders
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setCustomerData: (state, action) => {
      state.customerData = { ...state.customerData, ...action.payload };
    },
    setMeasurements: (state, action) => {
      state.measurements = { ...state.measurements, ...action.payload };
    },
    setDesignReferences: (state, action) => {
      state.designReferences = { ...state.designReferences, ...action.payload };
    },
    resetOrder: (state) => {
      state.customerData = {
        name: '',
        phone: '',
        address: '',
        totalAmount: ''
      };
      state.measurements = {
        length: '',
        body: '',
        waist: '',
        hip: '',
        leg: '',
        armLength: '',
        armWidth: '',
        bottomRound: '',
        additionalNotes: '',
        sketchData: null
      };
      state.designReferences = {
        capturedImages: [],
        uploadedFiles: [],
        designNotes: ''
      };
      state.status = 'idle';
      state.error = null;
    },
    // Set order data for editing
    setOrderForEdit: (state, action) => {
      const order = action.payload;
      state.customerData = {
        name: order.customerName || '',
        phone: order.phoneNumber || '',
        address: order.address || '',
        totalAmount: order.totalAmount || ''
      };
      state.measurements = {
        length: order.measurements?.length || '',
        body: order.measurements?.body || '',
        waist: order.measurements?.waist || '',
        hip: order.measurements?.hip || '',
        leg: order.measurements?.leg || '',
        armLength: order.measurements?.armLength || '',
        armWidth: order.measurements?.armWidth || '',
        bottomRound: order.measurements?.bottomRound || '',
        additionalNotes: order.specialNotes || order.measurements?.additionalNotes || '',
        sketchData: order.measurementSketch ? { imageData: order.measurementSketch } : null
      };
      state.designReferences = {
        capturedImages: order.designReference?.map((url, index) => ({
          id: `edit-${index}`,
          url: url,
          thumbnailUrl: url
        })) || [],
        uploadedFiles: [],
        designNotes: order.specialNotes || ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit order
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new order to the orders array
        state.orders.push(action.payload);
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Order submission failed:', action.payload); // Debug log
      })
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Fetching orders failed:', action.payload); // Debug log
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the order in the orders array
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Updating order status failed:', action.payload); // Debug log
      })
      // Update order
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the order in the orders array
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Updating order failed:', action.payload); // Debug log
      });
  }
});

// Export the actions
export const { setCustomerData, setMeasurements, setDesignReferences, resetOrder, setOrderForEdit } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;