import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// first, create the thunk
// Note: This 'thunk' will be dispatch in the Post component.

// createAsyncThunk accepts three parameters: a string action type value,
// a payloadCreator callback, and an options object.
export const fetchPosts = createAsyncThunk(
  // 1. first - a string action type value(slice name/thunk)
  'posts/fetchPosts',

  // 2. second - A callback function that should return a promise containing the result of some asynchronous logic
  async (ob, { dispatch, getState }) => { 
    // first arg is when dispatching, second arg is object pass by the redux toolkit 
    // with second arg - dispatch, we can dispatch any Action objects from here like

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const fetchData = await response.json();
    return fetchData
  }
  // createAsyncThunk will dispatch plain Action Creators for the pending, fulfilled & rejected
  // cases attached as nested fields. To handle these, thunk will be added to key - extraReducers below. 
);

const postsSlice = createSlice({
  name: 'posts',

  initialState: {
    list: [],
    status: null,
  },

  // 3. an options object

  // An Actions that has been dispatched from a thunk will be added into this key - extraReducers
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    // Write your own reducer logic that handles these actions, with whatever loading state
    // and processing logic is appropriate.

    // this reducer will handle the 'pending' action which is dispatch automatically from fetchPosts thunk
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },

    // fulfilled action creator & reducer
    [fetchPosts.fulfilled]: (state, {payload}) => {
      state.list = payload
      state.status = 'success'
    },

    // rejected action creator & reducer
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
    }
  },
});



// It is a convention to export reducer as a default export
// Exporting this todosSlice as todosReducer in Redux Store - store.js
export default postsSlice.reducer;
