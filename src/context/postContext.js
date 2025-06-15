// /context/PostContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchPosts = async () => {
    if (hasFetched) return; // don't re-fetch

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setPosts(data);
        setHasFetched(true);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err.message);
    }
  };

  const addPost = (post) => setPosts((prev) => [post, ...prev]);

  return (
    <PostContext.Provider value={{ posts, fetchPosts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
