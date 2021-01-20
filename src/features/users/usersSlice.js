import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

// A function that generates a set of prebuilt reducers and selectors for performing CRUD operations
// on a 'Normalized State (organized)' structure containing instances of a particular type of data object.

// When a piece of data is duplicated in several places, it becomes harder to make sure that it is updated appropriately.
// Nested data means that the corresponding reducer logic has to be more nested and therefore more complex.
// In particular, trying to update a deeply nested field can become very ugly very fast.

// Since immutable data updates require all ancestors in the state tree to be copied and updated as well,
// and new object references will cause connected UI components to re-render,
// an update to a deeply nested data object could force totally unrelated UI components to re-render
// even if the data they're displaying hasn't actually changed.

// Because of this, the recommended approach to managing relational or nested data in a Redux store
// is to treat a portion of your store as if it were a database, and keep that data in a normalized form.

// fetching data
export const fetchData = createAsyncThunk(
  'users/fetchData', // 1. first - a string action type value(slice name/thunk)

  // _ is empty value
  async (_, { dispatch }) => {
    const data = await fetch('http://localhost:3001/users').then(res =>
      res.json()
    );

    // normalizing user data in this format - organizing
    const users = data.map(({ id, name, email, articles, comments }) => ({
      id,
      name,
      email,
      articles: articles.map(({ id }) => id),
      comments: comments.map(({ id }) => id),
    }));

    // after loading data to replace everything in the previous state with a new one
    dispatch(setUsers(users));

    // customizing articles & comments 
    const articles = data
      .map(user =>
        user.articles.map(article => ({ ...article, userId: user.id }))
      )
      .flat();

    const comments = data
      .map(user =>
        user.comments.map(comment => ({ ...comment, userId: user.id }))
      )
      .flat();
  }
);

// Note: The term "Entity" is used to refer to a unique type of data object in an application.
// createEntityAdapter may be called multiple times in an application.
// createEntityAdapter accepts a single options object parameter,
// with two optional fields inside - selectId & sortComparer, this is optional
const usersAdapter = createEntityAdapter({
  // Normalizing User data here
  // Each id of a user will point to the user object for better organization & reference.
  selectId: user => user.id, // can destructure here
});
// now, usersAdapter contains lots of reducers by default
// eg. usersAdapter.addOne, usersAdapter.setAll, usersAdapter.updateOne etc

const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    // setting our reducers to link with usersAdapter to dispatch them
    addUser: usersAdapter.addOne,
    setUsers: usersAdapter.setAll, // setAll will replace everything in the previous state with a new one
    addUsers: usersAdapter.addMany, // addMany accepts an array of entities or an object & adds them
  },
});

export const { addUser, setUsers, addUsers } = usersSlice.actions;

export default usersSlice.reducer;
