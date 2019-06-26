//react imports
import React, { Component } from 'react'
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from './Footer'

////my components
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'

class App extends Component {
    render() {
        return (
            <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">{this.props.user.userName}</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Settings</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    <Button onClick={() => {
                        console.log(this.props)
                        this.props.user.loggedIn ? this.props.LOG_OUT_ACTION() :
                            this.props.history.push('/login')
                    }
                    }>{this.props.user.loggedIn ? 'Logout' : 'Login'}</Button>
                </Form>
            </Navbar>
            </>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
