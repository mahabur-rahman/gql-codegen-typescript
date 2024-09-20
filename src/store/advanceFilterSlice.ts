import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdvanceFilterState {
  rating: number | null; // Only keep the rating property
}

const initialState: AdvanceFilterState = {
  rating: null, // Initialize to null or a default value
};

const advanceFilterSlice = createSlice({
  name: 'advanceFilter',
  initialState,
  reducers: {
    setRating(state, action: PayloadAction<number | null>) { // Action to set rating
      state.rating = action.payload;
    },
  },
});

export const { setRating } = advanceFilterSlice.actions;
export default advanceFilterSlice.reducer;
