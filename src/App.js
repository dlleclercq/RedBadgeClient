import React, { Component } from 'react';
import SiteBar from './Component/LogNavbar';
import INavBar from './Component/INavBar';
import Auth from './auth/Auth';
import ClickPage from './Component/ClickPage';
import Inventory from './Component/Inventory';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Input } from 'reactstrap';

class App extends Component {

  constructor() {
    super();
    this.state = {
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }

  setToken = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token })
  }

  logout = () => {
    this.setState({
      sessionToken: '',
    })
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/"><SiteBar /></Route>
            <Route exact path="" token={this.props.token}><INavBar/></Route>
          </Switch>
        </Router>
      </div>

    );
  }
}


export default App;