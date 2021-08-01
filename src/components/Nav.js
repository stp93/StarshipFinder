import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import List from './List';
import './nav.css';
import Planets from './Planets';
import Vehicles from './Vehicles';

export class Nav extends Component {
    render() {
        return (
            <div>
    <Router>
    
     <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/List">Starships</Link></li>
          <li><Link to="/Vehicles">Vehicles</Link></li>
          <li><Link to="/Planets">Planets</Link></li>
      </ul>
      </nav>
      
      <Switch>
      <Route exact path="/"><Home/></Route>
        <Route path="/List"><List/></Route>
        <Route path="/Vehicles"><Vehicles/></Route>
        <Route path="/Planets"><Planets/></Route>
      </Switch>
      
    </Router>
            </div>
        )
    }
}

export default Nav


