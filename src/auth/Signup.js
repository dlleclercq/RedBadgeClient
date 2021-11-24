import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from "react-router-dom"

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwordhash: ''
        };
    }

    setToken = (token) => {
        localStorage.setItem('token', token);
        this.setState({ sessionToken: token })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        fetch("http://localhost:3000/user/create", {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    passwordhash: this.state.passwordhash
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json' //4
            })
        }).then(
            (response) => response.json() //5
        ).then((data) => {
            this.setToken(data.sessionToken)
        });

        fetch("http://localhost:3000/dropInvent/newdrop", {
            method: "POST",
            body: JSON.stringify({
              dropInvent: {
                numOfDrops: 0
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": this.props.token || localStorage.getItem("token") //4
            }),
          })
            .then(
              (response) => response.json() //5
            );
        this.props.history.push("/ClickPage")
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <br />
                        <Input id="username" type="text" name="username" placeholder="enter username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <br />
                        <Input id="su_password" type="password" name="password" placeholder="enter password" value={this.state.passwordhash} onChange={(e) => this.setState({ passwordhash: e.target.value })} />
                    </FormGroup>
                    <br />
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(Signup);