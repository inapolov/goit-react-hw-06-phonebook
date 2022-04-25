import { configureStore } from "@reduxjs/toolkit";
import { createReducer, createAction } from "@reduxjs/toolkit";

export const increment = createAction('myValue/increment');
export const decrement = createAction('myValue/decrement');

const myReducer = createReducer(10, {
    [increment]: (state, action) => state + action.payload,
    [decrement]: (state, action) => state - action.payload,
    
});

export const store = configureStore({
    reducer: {
      myValue:myReducer,
  },
});