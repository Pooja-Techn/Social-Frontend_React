// /components/FeedList.js
import React from 'react';
import { usePosts } from '../context/postContext';

const FeedList = () => {
  const { posts, setPosts } = usePosts();
   const token = localStorage.getItem('token');

const handleLikeToggle = async (postId, likedByCurrentUser) => {
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    let response;
    if (!likedByCurrentUser) {
      response = await fetch(`http://localhost:5000/api/like/${postId}`, {
        method: 'POST',
        headers,
      });
    } else {
      response = await fetch(`http://localhost:5000/api/like/${postId}`, {
        method: 'DELETE',
        headers,
      });
    }

    if (response.ok) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likedByCurrentUser: !likedByCurrentUser,
                likeCount: likedByCurrentUser
                  ? (post.likeCount || 1) - 1
                  : (post.likeCount || 0) + 1,
              }
            : post
        )
      );
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    // Optionally, you can show an error message to the user
  }
}

  return (
    <div className="feed-list">
      {posts.length === 0 ? (
        <div className="text-muted">No posts yet.</div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card mb-3 shadow-sm">
            <div className="card-body position-relative">
              <p className="card-text mb-1 fw-semibold">{post.author.email}</p>
              <p className="card-text">{post.content}</p>
              {post.mediaUrl && (
                <img
                  src={post.mediaUrl}
                  alt="post"
                  className="img-fluid rounded mb-2"
                />
              )}
              <small className="text-muted d-block mb-4">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </small>
              <div className="d-flex justify-content-end align-items-center position-absolute" style={{ right: '1rem', bottom: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-light btn-sm d-flex align-items-center shadow-sm"
                  style={{ border: 'none' }}
                  onClick={() => handleLikeToggle(post._id, post.likedByCurrentUser)}
                  aria-label={post.likedByCurrentUser ? 'Unlike' : 'Like'}
                >
                  <i
                    className={`bi ${post.likedByCurrentUser ? 'bi-heart-fill text-danger' : 'bi-heart text-danger'} fs-5`}
                  ></i>
                  <span className="ms-2">{post.likeCount || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}



export default FeedList;
