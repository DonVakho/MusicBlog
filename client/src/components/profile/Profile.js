//react imports
import React, { Component } from 'react'
import { Nav, FormControl, Button, Form } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Query } from "react-apollo";

//my components
import { GET_PROFILE } from '../../queries/queries'
import StateHolder from '../StateHolder'
import Posts from './posts/Posts'

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        StateHolder.logout()
        this.props.history.push('/login')
    }
    render() {
        return (
            <>
                <Query query={GET_PROFILE} variables={{ email: StateHolder.getEmail() }}>
                    {({ loading, error, data }) => {
                        if (loading) return <h3>...loading</h3>;
                        if (error) return `Error! ${error}`;
                        return <>
                            <Navbar bg="dark" variant="dark">
                                <Navbar.Brand href="#home">{data.user.firstName}</Navbar.Brand>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/settings">Settings</Nav.Link>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-info">Search</Button>
                                </Form>
                            </Navbar>
                            {console.log(data)}
                            <Posts posts={data.user.posts} />
                        </>
                    }}
                </Query>
            </>
        )
    }
}

export default Profile
