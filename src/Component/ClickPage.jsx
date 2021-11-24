import React from "react";

class ClickPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, newDrop: 1 };
    this.buttonClick = this.buttonClick.bind(this);
  }

  // make background. make it update numOfDrops when reaching 50 clicks. Fix handleClick

  buttonClick() {
    if (this.state.count === 3) {
      this.setState({ newDrop: this.state.newDrop + 1 });
      console.log(this.state.newDrop);
      this.setState({ count: (this.state.count = 0) });
      this.props.updateDrop();
      this.addDrop();
    } else {
      this.setState({ count: (this.state.count + 1) });
    }
  }

  addDrop = () => {
    fetch("http://localhost:3000/dropInvent/dropused", {
      method: "PUT",
      body: JSON.stringify({
        dropInvent: {
          numOfDrops: this.state.newDrop
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token || localStorage.getItem("token") //4
      }),
    })
      .then(
        (response) => response.json() //5
      )
      .then(() => {
        alert("New Drop Added");
        this.setState({ numOfDrops: this.state.numOfDrops });
      });
  //  event.preventDefault();
  };

  render() {
    return (
      <div className="clickBody">
        <a onClick={this.buttonClick} className="dropButton">
          <img src={require("./vBox.jpg")} alt="..." />
        </a>
      </div>
    );
  }
}

export default ClickPage;
