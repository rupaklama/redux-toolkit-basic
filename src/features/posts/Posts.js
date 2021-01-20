import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';

const Posts = () => {

  const dispatch = useDispatch();

 useEffect(() => {
   // dispatching fetchPosts thunk
   // when dispatching thunk, it only accepts one argument - fetchPosts(hello,) instead
   // put 'object' so that we can pass multiple values - fetchPosts({ limit: 5})
   dispatch(fetchPosts())
 }, [dispatch])

  return (
    <div>
      <h1>posts...</h1>
    </div>
  )
}

export default Posts
