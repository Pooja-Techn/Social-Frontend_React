import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePosts } from '../context/postContext';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const {addPost} = usePosts()

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
 toast.error('Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content, mediaUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      // Clear inputs
      setContent('');
      setMediaUrl('');
      toast.success('Post created successfully!');
      addPost(data); 
    } catch (err) {
     toast.error(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-3">
        <h5 className="card-title mb-3">Create a Post</h5>

        {error && (
          <div className="alert alert-danger py-1" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handlePostSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="Optional media URL"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
