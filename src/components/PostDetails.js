import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PostDetails = () => {
  const { forumId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/forums/${forumId}/posts/${postId}`);
      setPost(response.data);
      setLikeCount(response.data.like_count);
      setDislikeCount(response.data.dislike_count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/forums/${forumId}/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:5000/forums/${forumId}/posts/${postId}/comments`, { text: newComment });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePost = async () => {
    try {
      await axios.post(`http://localhost:5000/forums/${forumId}/posts/${postId}/like`);
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikePost = async () => {
    try {
      await axios.post(`http://localhost:5000/forums/${forumId}/posts/${postId}/dislike`);
      setDislikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/forums/${forumId}/posts/${postId}/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(`http://localhost:5000/forums/${forumId}/posts/${postId}/comments/${commentId}`, {
        text: 'Updated Comment Text',
      });
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/forums/${forumId}/posts/${postId}`);
      // Redirect to the posts page after deleting the post
      window.location.href = `/forums/${forumId}/posts`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.post_name}</h2>
          <p>{post.description}</p>
          <button onClick={handleDeletePost}>Delete Post</button>
          <button onClick={handleLikePost}>Like ({likeCount})</button>
          <button onClick={handleDislikePost}>Dislike ({dislikeCount})</button>

          <h3>Comments</h3>
          {comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.text}</p>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
                  <button onClick={() => handleUpdateComment(comment.id)}>Update Comment</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments available.</p>
          )}

          <div>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
      <Link to={`/forums/${forumId}/posts`}>Back to Posts</Link>
    </div>
  );
};

export default PostDetails;
