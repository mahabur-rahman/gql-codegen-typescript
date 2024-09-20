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
    
   
  },
});

export const { setRating, setLanguages } = advanceFilterSlice.actions;
export default advanceFilterSlice.reducer;
