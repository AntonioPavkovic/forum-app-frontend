import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ForumList from './components/ForumList';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>Forum App</h1>
        <Switch>
          <Route exact path="/">
            <ForumList />
          </Route>
          <Route path="/forums/:forumId/posts/:postId">
            <PostDetails />
          </Route>
          <Route path="/forums/:forumId/posts">
            <PostList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
