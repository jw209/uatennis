import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Home from './Home';
import About from './About';
import Forum from './Forum';

class App extends React.Component {
  
  state = {
    name: '',
    score: 0,
    players: []
  };

  componentDidMount = () => {
    this.getPlayer();
  }

  getPlayer = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ players: data })
        console.log('Data has been retrieved!');
      })
      .catch(() => {
        console.log('Error retrieving data');
      })
  }

  displayPlayers = (players) => {
    if (!players.length) return null;
    
    players.sort(function(a, b) {
      return b.score - a.score;
    });

    return players.map((player, index) => (
      <div key={index}>
        <h3>{player.name}</h3>
        <p>{player.score}</p>
      </div>
    ))
  }

  render() {
    return (
      <div className="App">
        <header className="Container">
          <div className="Player-list">
            {this.displayPlayers(this.state.players)}
          </div>
          <div className="Content">
          <Router>
            <h1><Link to="/" className="Home-link">UA Tennis Club</Link></h1>
            <div className="Links"><p><Link to="/about" className="Other-nav">About</Link><Link to="/forum" className="Other-nav">Posts &amp; Announcements</Link></p></div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/forum">
                <Forum />
              </Route>
            </Switch>
          </Router>
          </div>
        </header>
      </div>
    );
  }  
}

export default App;
