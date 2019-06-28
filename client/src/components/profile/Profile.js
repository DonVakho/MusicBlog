//General Imports
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Query } from "react-apollo";
import {
    Jumbotron,
    Button
} from 'react-bootstrap'

//***********************************************
import { GET_PROFILE, ADD_POST } from '../../queries/queries'
import MessageDiv from '../../styled-components/MessageDiv'
import Posts from '../posts/Posts'
import CustomForm from '../../styled-components/LoginForm'
import InputField from '../../styled-components/LoginInput'
import Label from '../../styled-components/Label'

//Redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../redux/connectMaps'

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postTitle: '',
            postText: '',
            showForm: false
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
            <>
                <Query query={GET_PROFILE} variables={{ email: this.props.user.email }}>
                    {({ loading, error, data }) => {
                        if (loading) return <h3>...loading</h3>;
                        if (error) return `Error! ${error}`;
                        if (!this.props.posts.loaded)
                            this.props.LOAD_USER_POSTS_ACTION(data.user.posts)
                        return <>
                        </>
                    }}
                </Query>
                <ApolloConsumer>
                    {client => (
                        <div style={{ paddingTop: '5%', width: '80%', paddingLeft: '15%' }}>
                            {this.props.posts.userPosts.length > 0 ?
                                <>
                                    <MessageDiv>Your Posts</MessageDiv>
                                    <Posts posts={this.props.posts.userPosts} />
                                </>
                                :
                                <>
                                    <MessageDiv>You Haven't Posted Yet
                                        <Jumbotron>
                                            <h2 style={{ color: 'black' }}>
                                                Say Something to the world
                                            </h2>
                                        </Jumbotron>
                                    </MessageDiv>
                                </>
                            }
                            <Button onClick={() => { this.setState({ showForm: true }) }}>New Post</Button>

                            <CustomForm
                                style={{ position: 'relative', display: this.state.showForm ? '' : 'none', width: '100%', padding: '1%' }}
                                onSubmit={async (e) => {
                                    e.preventDefault()
                                    const { data } = await client.mutate({
                                        mutation: ADD_POST,
                                        variables: {
                                            title: this.state.postTitle,
                                            description: this.state.postText,
                                            userid: this.props.user.id
                                        }
                                    });
                                    this.props.APPEND_USER_POSTS_ACTION(data.addPost)
                                }}
                            >
                                <Label>Title</Label>
                                <InputField type="text" placeholder="Enter post title here"
                                    required name="postTitle" onChange={(e) => this.inputChange(e)} value={this.state.postTitle} />
                                <Label>Desctiption</Label>
                                <InputField type="text" placeholder="Write your post here"
                                    required name="postText" onChange={(e) => this.inputChange(e)} value={this.state.postText} />
                                <Button variant="primary" type="submit">Submit</Button>
                                <Button variant="danger" onClick={() => {
                                    this.setState({
                                        postTitle: '',
                                        postText: '',
                                        showForm: false
                                    })
                                }}>Cancel</Button>
                            </CustomForm>
                        </div>
                    )}
                </ApolloConsumer>

            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)