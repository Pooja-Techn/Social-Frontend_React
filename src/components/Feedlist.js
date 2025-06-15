// /components/FeedList.js
import React from 'react';
import { usePosts } from '../context/postContext';

const FeedList = () => {
  const { posts } = usePosts();

  return (
    <div className="feed-list">
      {posts.length === 0 ? (
        <div className="text-muted">No posts yet.</div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card mb-3 shadow-sm">
            <div className="card-body">
                <p className="card-text">{post.author.email}</p>
              <p className="card-text">{post.content}</p>
              {post.mediaUrl && (
                <img
                  src={post.mediaUrl}
                  alt="post"
                  className="img-fluid rounded"
                />
              )}
              <small className="text-muted">Posted on {new Date(post.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedList;
