import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
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
        });
    }

    handleSubmit = (event) => {
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.setToken(data.sessionToken)
        });
        this.props.history.push("/ClickPage");
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="li_username" type="text" name="username" placeholder="enter username" onChange={(e) => this.setState({ username: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" placeholder="enter password" onChange={(e) => this.setState({ passwordhash: e.target.value })} />
                    </FormGroup>
                    <Button type="submit" onClick={this.handleCLick}>Submit</Button>
                </Form>
            </div>
        )
    }
}
export default withRouter(Login);