//General Imports
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';

//redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
             searchText: ''
        }
        this.inputChange = this.inputChange.bind(this)
    }
    
    inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand onClick={() => {
                    this.props.PREPARE_FOR_LOAD_ACTION()
                    if (this.props.user.loggedIn)
                        this.props.history.push('/profile')
                }}>{this.props.user.firstName}
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => {
                        this.props.PREPARE_FOR_LOAD_ACTION()
                        this.props.history.push('/')
                        }}>Home</Nav.Link>
                    {this.props.user.loggedIn?<Nav.Link onClick={() => this.props.history.push('/settings')}>Settings</Nav.Link>:
                    <></>}
                    {this.props.user.loggedIn?<></>:
                    <Nav.Link onClick={() => this.props.history.push('/register')}>Register</Nav.Link>}
                </Nav>
                <Form inline onSubmit={(e)=>{
                        e.preventDefault();
                        this.setState({
                            searchText: ''
                        })
                        this.props.SEARCH_ACTION(this.state.searchText)
                        this.props.history.push('/')
                        }}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" 
                    required name="searchText" 
                    onChange={(e) => this.inputChange(e)} value={this.state.searchText}
                     />
                    <Button type='submit' variant="outline-info">Search</Button>
                    <Button onClick={() => {
                        this.props.CLEAR_ACTION()
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