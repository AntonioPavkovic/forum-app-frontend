import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editForumId, setEditForumId] = useState('');

  useEffect(() => {
    getForums();
  }, []);

  const getForums = async () => {
    try {
      const response = await axios.get('http://localhost:5000/forums');
      setForums(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createForum = async () => {
    try {
      const response = await axios.post('http://localhost:5000/forums', { name, description });
      setForums([...forums, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteForum = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/forums/${id}`);
      setForums(forums.filter((forum) => forum._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editForum = (forum) => {
    setEditMode(true);
    setEditForumId(forum._id);
    setName(forum.name);
    setDescription(forum.description);
  };

  const updateForum = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/forums/${editForumId}`, {
        name,
        description,
      });
      setForums(
        forums.map((forum) =>
          forum._id === editForumId ? response.data : forum
        )
      );
      setEditMode(false);
      setEditForumId('');
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const cancelUpdate = () => {
    setEditMode(false);
    setEditForumId('');
    setName('');
    setDescription('');
  };

  return (
    <div className="forum-app">
      <h1>Forums</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editMode ? (
          <>
            <button type="button" onClick={updateForum}>
              Update
            </button>
            <button type="button" onClick={cancelUpdate}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={createForum}>
            Create
          </button>
        )}
      </form>
      <h2>All Forums</h2>
      <ul>
        {forums.map((forum) => (
          <li key={forum._id}>
            <h3>{forum.name}</h3>
            <p>{forum.description}</p>
            <button type="button" onClick={() => deleteForum(forum._id)}>
              Delete
            </button>
            <button type="button" onClick={() => editForum(forum)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
