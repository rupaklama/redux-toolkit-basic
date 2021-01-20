import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { del, selectTodos } from './todosSlice';
import { List, FlexboxGrid, IconButton, Icon } from 'rsuite';

const Todos = () => {
  // useSelector takes an arrow func with arg state & which part of state we want from STORE through combineReducers
  // Using 'selectTodos' - reusable state
  const todos = useSelector(selectTodos);
  // console.log(todos)

  const dispatch = useDispatch();

  return (
    <List bordered>
      {todos.map(({txt, id}) => (
        <FlexboxGrid key={id}>
          <FlexboxGrid.Item colspan={12}>
            <List.Item bordered >
              {txt}
            </List.Item>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={10}></FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={2}>
          <IconButton 
            onClick={() => dispatch(del(id))}
            icon={<Icon icon="minus" />} color="red" circle />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      ))}
    </List>
  );
};

export default Todos;
