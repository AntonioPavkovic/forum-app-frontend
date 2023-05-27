import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Forums from './components/Forum';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/forums" component={Forums} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
