import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'],
};

const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);



export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;


export const store = configureStore({
    reducer: {
      contacts: contactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);