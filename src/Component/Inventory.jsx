import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle
} from "reactstrap";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfSkins: 0,
      displayIcon: "",
      weaponType: "",
      skinName: "",
      displayName: "",
    };
  }

  getSkinImg = (event) => {
    fetch("https://valorant-api.com/v1/weapons/skins", {
      method: "GET",
      body: JSON.stringify({
        data: {
          displayIcon: this.state.displayIcon,
          displayName: this.state.displayName
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
  };

  skinCardCreate = () => {
    for (var i = 0; i < this.state.numOfSkins; i++) {
      React.createElement(
        <Card>
          <CardBody>
            <CardTitle tag="h5">{this.skinName}</CardTitle>
            <CardSubtitle>
              <img src={this.state.displayIcon} alt="..." />
            </CardSubtitle>
          </CardBody>
        </Card>
      );
    }
  };

  skinAdd = (event) => {
    fetch("http://localhost:3000/ownedSkins/newskin", {
      method: "POST",
      body: JSON.stringify({
        ownedSkin: {
          skinName: this.state.skinName,
          weaponType: this.state.weaponType,
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
  };

 skinNew = (event) => {
        this.skinAdd(event);
        this.getSkinImg(event);
 }

  render() {
    return (
      <div>
        <Card className="cardPlaceholder">
          <CardBody>
            <CardTitle tag="h5">Glitchpop Odin</CardTitle>
            <br />
            <CardSubtitle>
              <img style={{width: 400, height: 100}} src="https://media.valorant-api.com/weaponskinlevels/8c95559d-44fb-544d-00d7-8192ed38b17a/displayicon.png" alt="..." />
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Inventory;
