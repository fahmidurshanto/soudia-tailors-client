// src/features/order/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create async thunk for submitting order
export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Server error');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    customerData: {
      name: '',
      phone: '',
      address: ''
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
      capturedImages: [], // Array of base64 images from camera
      uploadedFiles: [], // Array of uploaded file objects
      designNotes: '' // Special design instructions
    },
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
        address: ''
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Export the actions
export const { setCustomerData, setMeasurements, setDesignReferences, resetOrder } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;