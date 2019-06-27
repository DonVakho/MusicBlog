import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import {
    Jumbotron,
    Container,
    Col, Row,
    Button,
    OverlayTrigger,
    Tooltip,
    Form
} from 'react-bootstrap'

//Redux Imports
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../redux/connectMaps'

//*********************************************
import { ADD_COMMENT } from '../../queries/queries'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentText: ''
        }
        this.inputChange = this.inputChange.bind(this)
    }
    inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { post } = this.props
        return <>
        {console.log(post)}
            <Jumbotron>
                <Container>
                    <Row>
                        <Col lg={7} md={7}>
                            <div style={{ maxHeight: '400px', overflowY: 'auto', borderRight: '1px dotted gray' }}>
                                <h2>{post.title}</h2>
                                <h4>{post.description}</h4>
                                <hr />
                                <p>Created on: {post.created.substring(0, post.created.indexOf('G'))} <br />
                                    {post.modified !== post.created ? 'Last Modified:' + post.modified.substring(0, post.created.indexOf('G')) :
                                        'Not Modified'}</p>
                            </div>
                        </Col>
                        <Col>
                            <h3>comments</h3>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {post.comments.map((comment) => (
                                    <OverlayTrigger
                                        key={comment.id}
                                        placement={"right"}
                                        overlay={
                                            <Tooltip>Comment by <strong>{comment.user ? comment.user.firstName : ''}</strong></Tooltip>
                                        }
                                    >
                                        <div key={comment.id} style={{ backgroundColor: '#dadada', marginBottom: '5px', borderRadius: '8px', border: '1px solid #dadada' }}>
                                            <p style={{ padding: '4px' }}>{comment.text}</p>
                                        </div>
                                    </OverlayTrigger>
                                ))}
                            </div>
                            <ApolloConsumer>
                                {client => (
                                    <Form style={{ display: this.props.user.loggedIn ? '' : 'none' }}
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            this.setState({
                                                commentText: ''
                                            })
                                            if (this.state.commentText.length > 0) {
                                                const { data } = await client.mutate({
                                                    mutation: ADD_COMMENT,
                                                    variables: {
                                                        text: this.state.commentText,
                                                        postid: "5cfd02dd061e8329180bef3f",
                                                        user: "5cfd00a0061e8329180bef38"
                                                    }
                                                });
                                            }
                                        }}
                                    >
                                        <Row>
                                            <Col lg={8} md={8} xs={8}>
                                                <Form.Group>
                                                    <Form.Control size='lg' placeholder="Write Comment"
                                                        required type="text" name="commentText"
                                                        onChange={(e) => this.inputChange(e)} value={this.state.commentText} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={2} md={2} xs={2}>
                                                <Button size='sm' variant="dark" type="submit">Comment</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </ApolloConsumer>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </>
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Posts)