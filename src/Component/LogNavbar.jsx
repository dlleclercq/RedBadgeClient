import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import Login from '../auth/Login';
  import Signup from '../auth/Signup';

  class SiteBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      // Fix SignUp/LogIn

      render() {
          return(
            <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Valorant Clicker</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Sign Up
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem toggle={false}>
                        <Signup />
                    </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Log In
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem toggle={false}>
                        <Login />
                    </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          )
      }
    }

  export default SiteBar;