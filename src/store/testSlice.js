import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tests: [],
  currentTest: null,
  results: [],
  loading: false,
  error: null
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTests: (state, action) => {
      state.tests = action.payload;
    },
    setCurrentTest: (state, action) => {
      state.currentTest = action.payload;
    },
    addTest: (state, action) => {
      state.tests.push(action.payload);
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    addResult: (state, action) => {
      state.results.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  setTests, 
  setCurrentTest, 
  addTest, 
  setResults, 
  addResult, 
  setLoading, 
  setError, 
  clearError 
} = testSlice.actions;

export default testSlice.reducer;