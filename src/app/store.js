// app dir - contains the store configuration
import { configureStore } from '@reduxjs/toolkit';

// import our reducer from the slice
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
import postsReducer from '../features/posts/postsSlice';

// Use 'configureStore' function to create the store with Object options. 
// It will be directly used as the root reducer for the store
// by passing this object to the Redux combineReducers utility.
export default configureStore({
  reducer: {
    // passing each of our Reducers as key/value properties to create State Object in Redux Store
    counter: counterReducer,
    todos: todosReducer,
    posts: postsReducer
  },
  // devTools: false
});
