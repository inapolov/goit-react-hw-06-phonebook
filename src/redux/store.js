import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const contactsSlice =createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  }
});

export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;


export const store = configureStore({
    reducer: {
      contacts:contactsSlice.reducer,
  },
});