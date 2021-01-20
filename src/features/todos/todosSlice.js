import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    // NOTE: first arg - 'state' is the reference to the initial State of the reducer
    // Second arg - 'action' is Action object which has Type & Payload, can be destructure

    // add reducer
    add(state, { payload }) {
      // push the payload into the state
      // mutating state directly with the help of 'immer'
      state.push(payload);
    },

    // delete reducer
    del(state, {payload}) {
      // use return here, it won't work without it
      return state = state.filter(({id}) => id !== payload)
    }

  },
});

// action creators 
export const { add, del } = todoSlice.actions;

// To make the todos State accessible from the STORE
// & reusable everywhere in other components for DRY. 
// Same as useSelector takes an arrow func with arg state & which part of state we want from STORE through combineReducers
export const selectTodos = state => state.todos;

// It is a convention to export reducer as a default export
// Exporting this todosSlice as todosReducer in Redux Store - store.js
export default todoSlice.reducer;
