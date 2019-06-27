//General Imports
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

//Redux Imorts
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/connectMaps'

//*******************************************
import ProtectedRoute from './protected.route'
import Register from './registration/Register'
import Auth from './authorization/Auth'
import Profile from './profile/Profile'
import NavBar from './NavBar'
import Home from './Home'

class App extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route exact path="/login" component={Auth} />
                    <Route exact path="/register" component={Register} />
                    <ProtectedRoute path="/profile" component={props => <Profile {...props} email={this.props.user.email} />} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
