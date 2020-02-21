import React from 'react';
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Map from './Containers/Map'
import Locate from './Containers/Locate'
import Login from './Containers/Login'
import Register from './Containers/Register'

import Navbar from './Components/Navbar'

function App() {
  return (
    <div className="vh-100">
      <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path='/map' component={Map}/>
          <Route exact path='/locate' component={Locate}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
