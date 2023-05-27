import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forums.css';

const Forums = () => {
  const [forums, setForums] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await axios.get('http://localhost:5000/forums');
      setForums(response.data);
    } catch (error) {
      console.error('Failed to fetch forums', error);
    }
  };

  const createForum = async () => {
    try {
      const response = await axios.post('http://localhost:5000/forums', { name, description });
      setForums([...forums, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create forum', error);
    }
  };

  const deleteForum = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/forums/${id}`);
      setForums(forums.filter((forum) => forum._id !== id));
    } catch (error) {
      console.error('Failed to delete forum', error);
    }
  };

  return (
    <div className="forums-container">
      <h2>Forums</h2>
      <div className="forum-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createForum}>Create</button>
      </div>
      <ul className="forum-list">
        {forums.map((forum) => (
          <li className="forum-item" key={forum._id}>
            <h3 className="forum-name">{forum.name}</h3>
            <p className="forum-description">{forum.description}</p>
            <button className="forum-delete-btn" onClick={() => deleteForum(forum._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
