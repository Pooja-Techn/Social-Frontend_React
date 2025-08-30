// /pages/Feed.js
import { useEffect } from 'react';
import { usePosts } from '../context/postContext';
import CreatePostForm from '../components/createPostForm';
import FeedList from '../components/Feedlist';

const Feed = () => {
  const { fetchPosts } = usePosts();

  useEffect(() => {
    // Run once on mount
    fetchPosts();
  }, [fetchPosts]); // ✅ safe dependency

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Feed</h1>
      <CreatePostForm />
      <FeedList />
    </div>
  );
};

export default Feed;
