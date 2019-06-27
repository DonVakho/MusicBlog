//General Imports
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';

//redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand onClick={() => {
                    if (this.props.user.loggedIn)
                        this.props.history.push('/profile')
                }}>{this.props.user.firstName}
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => this.props.history.push('/')}>Home</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push('/login')}>Settings</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push('/register')}>Register</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    <Button onClick={() => {
                        this.props.user.loggedIn ? this.props.LOG_OUT_ACTION() :
                            this.props.history.push('/login')
                    }
                    }>{this.props.user.loggedIn ? 'Logout' : 'Login'}</Button>
                </Form>
            </Navbar>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))