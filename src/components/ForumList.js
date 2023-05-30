import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForumList = () => {
  const [forums, setForums] = useState([]);
  const [newForumName, setNewForumName] = useState('');
  const [newForumDescription, setNewForumDescription] = useState('');
  const [editForumId, setEditForumId] = useState(null);
  const [editedForumName, setEditedForumName] = useState('');
  const [editedForumDescription, setEditedForumDescription] = useState('');

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await axios.get('http://localhost:5000/forums');
      setForums(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddForum = async () => {
    try {
      await axios.post('http://localhost:5000/forums', {
        name: newForumName,
        description: newForumDescription,
      });
      setNewForumName('');
      setNewForumDescription('');
      fetchForums();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteForum = async (forumId) => {
    try {
      await axios.delete(`http://localhost:5000/forums/${forumId}`);
      fetchForums();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditForum = (forumId) => {
    const forum = forums.find((f) => f._id === forumId);
    setEditForumId(forumId);
    setEditedForumName(forum.name);
    setEditedForumDescription(forum.description);
  };

  const handleUpdateForum = async () => {
    try {
      await axios.put(`http://localhost:5000/forums/${editForumId}`, {
        name: editedForumName,
        description: editedForumDescription,
      });
      setEditForumId(null);
      setEditedForumName('');
      setEditedForumDescription('');
      fetchForums();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Forums</h2>
      <div>
        <input
          type="text"
          value={newForumName}
          placeholder="Forum Name"
          onChange={(e) => setNewForumName(e.target.value)}
        />
        <input
          type="text"
          value={newForumDescription}
          placeholder="Forum Description"
          onChange={(e) => setNewForumDescription(e.target.value)}
        />
        <button onClick={handleAddForum}>Add Forum</button>
      </div>
      {forums.map((forum) => (
        <div key={forum._id}>
          {editForumId === forum._id ? (
            <div>
              <input
                type="text"
                value={editedForumName}
                onChange={(e) => setEditedForumName(e.target.value)}
              />
              <input
                type="text"
                value={editedForumDescription}
                onChange={(e) => setEditedForumDescription(e.target.value)}
              />
              <button onClick={handleUpdateForum}>Save</button>
            </div>
          ) : (
            <div>
              <h3>{forum.name}</h3>
              <p>{forum.description}</p>
              <Link to={`/forums/${forum._id}/posts`}>View Posts</Link>
              <button onClick={() => handleDeleteForum(forum._id)}>Delete</button>
              <button onClick={() => handleEditForum(forum._id)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ForumList;
