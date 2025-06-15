// /pages/Feed.js
import React, { useEffect } from 'react';
import { usePosts } from '../context/postContext';
import CreatePostForm from '../components/createPostForm';
import FeedList from '../components/Feedlist';




const Feed = () => {
  const { fetchPosts } = usePosts()

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <CreatePostForm />
      <FeedList/>
    </div>
  );
};

export default Feed;
