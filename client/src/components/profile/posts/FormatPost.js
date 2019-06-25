import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
export default function Posts({ post }) {
    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Header>Posted on: {post.created}, last modified on: {post.modified}</Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Button variant="primary">Comment</Button>
            </Card.Body>
        </Card>
    </>
}