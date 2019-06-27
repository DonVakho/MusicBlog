import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
export default function Posts({ post }) {
    return <>
        <Jumbotron>
            <Container>
                <h1>{post.title}</h1>
                <h4>{post.description}</h4>
                <hr />
                <p>Created on: {post.created.substring(0, post.created.indexOf('G'))} <br/>
                    {post.modified !== post.created ? 'Last Modified:' + post.modified.substring(0, post.created.indexOf('G')) :
                        'Not Modified'}</p>
                <Button>Comment</Button>
            </Container>
        </Jumbotron>
    </>
}