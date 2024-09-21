import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdvanceFilterState {
  rating: number | null;
  languages: string[];
}

const initialState: AdvanceFilterState = {
  rating: null,
  languages: [],
};

const advanceFilterSlice = createSlice({
  name: 'advanceFilter',
  initialState,
  reducers: {
    setRating(state, action: PayloadAction<number | null>) {
      state.rating = action.payload;
    },
    setLanguages(state, action: PayloadAction<string[]>) {
      state.languages = action.payload;
    },
    toggleLanguage(state, action: PayloadAction<string>) {
      const language = action.payload;
      // If language already exists, remove it (unselect); otherwise, add it (select)
      if (state.languages.includes(language)) {
        state.languages = state.languages.filter((lang) => lang !== language);
      } else {
        state.languages.push(language);
      }
    },
  },
});

export const { setRating, setLanguages, toggleLanguage } = advanceFilterSlice.actions;
export default advanceFilterSlice.reducer;
