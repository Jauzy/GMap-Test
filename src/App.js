import React from 'react';
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Map from './Container/Map'
import Locate from './Container/Locate'
function App() {
  return (
    <div className="vh-100">
      <BrowserRouter>
        <Switch>
          <Route exact path='/map' component={Map}/>
          <Route exact path='/locate' component={Locate}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
