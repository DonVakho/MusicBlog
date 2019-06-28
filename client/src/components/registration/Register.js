//General Imports
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Button } from 'react-bootstrap';

//my components
import { ADD_USER, GET_USER } from '../../queries/queries'
import RegistrationMessage from './RegistrationMessage'
import LoginInput from '../../styled-components/LoginInput'
import LoginForm from '../../styled-components/LoginForm'
import Label from '../../styled-components/Label';

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rPassword: '',
            allValid: false,
            alreadyTried: false,
            userExists: false
        }
        this.inputChange = this.inputChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submit(success, data) {
        if (success) {
            if (data.addUser.id) {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    rPassword: '',
                    userExists: false,
                    alreadyTried: true,
                    allValid: true,
                })
            } else {
                alert('There is a server error please try again');
            }
        } else {
            if (data) {
                this.setState({
                    allValid: false,
                    userExists: true,
                    alreadyTried: true
                })
            }
            this.setState({
                allValid: false,
                alreadyTried: true,
            })
        }
    }
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <>
                        <LoginForm id="registrationForm" onSubmit={async (e) => {
                            e.preventDefault();
                            if (this.state.password !== this.state.rPassword) {
                                this.submit(false, null);
                            }
                            else {
                                const checkAvailable = await client.query({
                                    query: GET_USER,
                                    variables: {
                                        email: this.state.email,
                                    }
                                });
                                if (checkAvailable.data.user) {
                                    this.submit(false, checkAvailable.data.user.id);
                                } else {
                                    const { data } = await client.mutate({
                                        mutation: ADD_USER,
                                        variables: {
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            email: this.state.email,
                                            password: this.state.password
                                        }
                                    });
                                    this.submit(true, data);
                                }
                            }
                        }}>
                            <Label> First Name: </Label>
                            <LoginInput required type="text" name="firstName" onChange={(e) => this.inputChange(e)} value={this.state.firstName} />
                            <Label>Last Name: </Label>
                            <LoginInput required type="text" name="lastName" onChange={e => this.inputChange(e)} value={this.state.lastName} />
                            <Label> Email: </Label>
                            <LoginInput required type="email" name="email" onChange={(e) => this.inputChange(e)} value={this.state.email} />
                            <Label>Password: </Label>
                            <LoginInput required type="password" name="password" onChange={e => this.inputChange(e)} value={this.state.password} />
                            <Label>Confirm Password: </Label>
                            <LoginInput required type="password" name="rPassword" onChange={e => this.inputChange(e)} value={this.state.rPassword} />
                            <Button submit='true' type="submit">Register</Button>
                            <RegistrationMessage alreadyTried={this.state.alreadyTried} valid={this.state.allValid} userExists={this.state.userExists} />
                        </LoginForm>
                    </>
                )}
            </ApolloConsumer>
        )
    }
}
