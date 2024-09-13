import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdvanceFilterState {
  query: string;
}

const initialState: AdvanceFilterState = {
  query: '',
};

const advanceFilterSlice = createSlice({
  name: 'advanceFilter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = advanceFilterSlice.actions;
export default advanceFilterSlice.reducer;
