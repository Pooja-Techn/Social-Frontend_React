import { createContext, useContext, useState, useCallback } from 'react';

const CACHE_KEY = 'posts_cache';
const CACHE_TIME_KEY = 'posts_cache_time';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in ms

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  // Optional: track if we've fetched before
  // const [hasFetched, setHasFetched] = useState(false);

  const fetchPosts = useCallback(async () => {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();

    if (cached && cachedTime && now - Number(cachedTime) < CACHE_DURATION) {
      setPosts(JSON.parse(cached));
      // setHasFetched(true);
      return;
    }

    try {
      const res = await fetch('https://social-media-backend-yzzw.onrender.com/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setPosts(data);
        // setHasFetched(true);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err.message);
    }
  }, []); // ✅ stable function

  const addPost = useCallback((post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, fetchPosts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
