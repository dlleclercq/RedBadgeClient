import React from "react";

class ClickPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {count: 0, numOfDrops: 0}
        this.buttonClick = this.buttonClick.bind(this)
    }

// make background. make it update numOfDrops when reaching 50 clicks. Fix handleClick

    buttonClick(event) {
        if(this.state.count === 3) {
         this.setState({count: this.state.count=0});
         this.setState({numOfDrops: this.state.numOfDrops+1})
         this.addDrop(event);
        } else {
         this.setState({count: this.state.count+1})
        }
    }

    addDrop = (event) => {
        fetch("http://localhost:3000/dropInvent/dropused", {
            method: 'PUT',
            body: JSON.stringify({dropInvent: {
                numOfdrops: this.state.numOfDrops
            }}),
            headers: new Headers({
                'Content-Type': 'application/json' //4
            })
        }).then(
            (response) => response.json() //5
        ).then(() => {
            alert("New Drop Added")
            this.setState({numOfDrops: this.state.numOfDrops})
        }) 
        event.preventDefault()
    }

        render() {
            return(
                <div className="clickBody">
                    <a onClick={this.buttonClick} className="dropButton">
                        <img src={require("./vBox.jpg")} alt="..." />
                    </a>
                </div>
            )
        }
}

export default ClickPage;