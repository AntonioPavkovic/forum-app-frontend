import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PostList = () => {
  const { forumId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/forums/${forumId}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPost = async () => {
    try {
      await axios.post(`http://localhost:5000/forums/${forumId}/posts`, {
        title: newPostTitle,
        description: newPostDescription,
        forum_id: forumId
      });
      setNewPostTitle('');
      setNewPostDescription('');
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <input
          type="text"
          value={newPostTitle}
          placeholder="Title"
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <input
          type="text"
          value={newPostDescription}
          placeholder="Description"
          onChange={(e) => setNewPostDescription(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <Link to={`/forums/${forumId}/posts/${post._id}`}>View Post</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
