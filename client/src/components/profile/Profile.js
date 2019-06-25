//react imports
import React, { Component } from 'react'
import { Query } from "react-apollo";

//my components
import { GET_PROFILE } from '../../queries/queries'
import StateHolder from '../StateHolder'
import Posts from './Posts'

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
            <Query query={GET_PROFILE} variables={{ email: StateHolder.getEmail() }}>
                {({ loading, error, data }) => {
                    if (loading) return <h3>...loading</h3>;
                    if (error) return `Error! ${error}`;
                    return <>
                        {console.log(data)}
                        {console.log(data.user.posts)}
                        <h1>{data.user.firstName}'s Profile</h1>
                        <h3>{data.user.posts.map(post => (
                            <Posts key={post.id} post={post}/>
                        ))}</h3>
                    </>
                }}
            </Query>
        )
    }
}

export default Profile
