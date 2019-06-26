//react imports
import React, { Component } from 'react'
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http';
import { connect } from 'react-redux'

////my components
import Register from '../components/registration/Register'
import ProtectedRoute from '../components/protected.route'
import Auth from './authorization/Auth'
import Profile from './profile/Profile'
import StateHolder from './StateHolder'
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'
import Home from './Home'

//setup apollo
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/entrance'
})
const client = new ApolloClient({
    cache,
    link
})

//App
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <ApolloProvider client={client}>
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
                                this.props.history.push('/')
                        }
                        }>{this.props.user.loggedIn ?'Logout':'Login'}</Button>
                    </Form>
                </Navbar>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Auth} />
                        <Route exact path="/register" component={Register} />
                        <ProtectedRoute path="/profile" component={props => <Profile {...props} email={StateHolder.getEmail()} />} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
