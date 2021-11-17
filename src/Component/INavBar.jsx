import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import ClickPage from "./ClickPage";
import Inventory from "./Inventory";

class INavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfDrops: 0
    };
  }

  dropViewer(event){
    this.viewDrop(event)
  }

  useDrop = (event) => {
    fetch("http://localhost:3000/dropInvent/dropUsed", {
        method: 'PUT',
        body: JSON.stringify({dropInvent: {
            numOfDrops: this.state.numOfDrops
        }}),
        headers: new Headers({
            'Content-Type': 'application/json' //4
        })
    }).then(
        (response) => response.json() //5
    ).then((data) => {
        window.alert(data)
    }) 
    event.preventDefault()
}

viewDrop = (event) => {
  fetch("http://localhost:3000/dropInvent/viewdrops", {
      method: 'GET',
      body: JSON.stringify({dropInvent: {
          numOfDrops: this.state.numOfDrops
      }}),
      headers: new Headers({
          'Content-Type': 'application/json' //4
      })
  }).then(
      (response) => response.json() //5
  ).then((data) => {
      window.alert(data)
  }) 
  event.preventDefault()
  this.setState({numOfDrops: this.state.numOfDrops})
}


  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img src={require("./V_Logomark_Red.png")} alt="..." className="logoImg" />
          </NavbarBrand>
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavbarText style={{fontSize:"24px", color: "white"}}>{this.state.numOfDrops}</NavbarText>
                </NavItem>
              <NavItem>
                <a onClick="" className="navDropImg">
                <img src={require("./vBox.jpg")} alt="..." className="boxImg" />
                </a>
              </NavItem>
            </Nav>
          </Collapse>
          <Link style={{color:"#ff4554", fontSize: "22px"}} to="/ClickPage" className="clickLink">Click!</Link>
          <Link style={{color:"#ff4554", fontSize: "22px"}} to="/Inventory" className="inventLink">Inventory</Link>
          <Switch>
          <Route exact path="/ClickPage"><ClickPage/></Route>
          <Route exact path="/Inventory"><Inventory/></Route>
          </Switch>
        </Navbar>
      </div>
    );
  }
}

export default INavBar;
