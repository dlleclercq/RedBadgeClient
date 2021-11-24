import React, {useEffect} from "react";
import { Card, CardTitle, CardBody, CardSubtitle } from "reactstrap";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfSkins: 1,
      displayIcon: "",
      displayName: "",
    };
  }

  skinCardCreate = () => {
    for (var i = 0; i < 50; i++) {
      React.createElement(
        <Card>
          <CardBody>
            <CardTitle tag="h5">{this.state.displayName}</CardTitle>
            <CardSubtitle>
              <img src={this.state.displayIcon} alt="..." />
            </CardSubtitle>
          </CardBody>
        </Card>
      );
    }
  };

  render() {
    return (
      <div>
        {this.skinCardCreate()}
      </div>
    );
  }
}

export default Inventory;
