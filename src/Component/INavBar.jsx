import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { Route, Switch, Link } from "react-router-dom";
import ClickPage from "./ClickPage";
import Inventory from "./Inventory";

class INavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      numOfDrops: 0,
    };
    this.updateDrop.bind(this);
  }

  dropViewer(event) {
    this.viewDrop(event);
  }

  updateDrop = () => {
    this.setState({
      numOfDrops: this.state.numOfDrops + 1,
    });
  };

  viewDrop = (event) => {
    fetch("http://localhost:3000/dropInvent/viewdrops", {
      method: "GET",
      body: JSON.stringify({
        dropInvent: {
          numOfDrops: this.state.numOfDrops,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json", //4
      }),
    })
      .then(
        (response) => response.json() //5
      )
      .then((data) => {
        window.alert(data);
      });
    event.preventDefault();
    this.setState({ numOfDrops: this.state.numOfDrops });
  };

  getSkinImg = () => {
    fetch("https://valorant-api.com/v1/weapons/skins", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.setState({ displayName: [Math.random() * 392].displayName });
    console.log(this.state.displayName);
    this.skinAdd();
  };

  skinAdd = () => {
    fetch("http://localhost:3000/ownedSkins/newskin", {
      method: "POST",
      body: JSON.stringify({
        skinList: {
          ownedSkin: "Reaver",
          skinChroma: " ",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token || localStorage.getItem("token"),
      }),
    }).then(
      (response) => response.json() //5
    );
  };

  logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand>
            <img
              src={require("./V_Logomark_Red.png")}
              alt="..."
              className="logoImg"
            />
          </NavbarBrand>
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavbarText style={{ fontSize: "24px", color: "white" }}>
                  {this.state.numOfDrops}
                </NavbarText>
              </NavItem>
              <NavItem>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown>
                    <DropdownToggle nav>
                      <a className="navDropImg">
                        <img
                          src={require("./vBox.jpg")}
                          alt="..."
                          className="boxImg"
                        />
                      </a>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem toggle={false}>
                        <Button onClick={this.getSkinImg}>Open Drop</Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </NavItem>
            </Nav>
          </Collapse>
          <Link
            style={{ color: "#ff4554", fontSize: "22px" }}
            to="/ClickPage"
            className="clickLink"
          >
            Click!
          </Link>
          <Link
            style={{ color: "#ff4554", fontSize: "22px" }}
            to="/Inventory"
            className="inventLink"
          >
            Inventory
          </Link>
          <Switch>
            <Route exact path="/ClickPage">
              <ClickPage
                token={this.props.token}
                numOfDrops={this.state.numOfDrops}
                updateDrop={this.updateDrop}
              />
            </Route>
            <Route exact path="/Inventory">
              <Inventory
                token={this.props.token}
                skinAdd={this.props.skinAdd}
              />
            </Route>
          </Switch>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                Log Out
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem toggle={false}>
                  <Button onClick={this.logout}>LogOut</Button>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default INavBar;
