import React from 'react'
import FormatPost from './FormatPost'
import { Container, Row } from 'react-bootstrap';

export default function Posts({ posts, comments }) {
    return <>
        <div>
            <Container>
                <Row>
                    {posts.map(post => (
                        <FormatPost key={post.id} post={post} />
                    ))}
                </Row>
            </Container>
        </div>
    </>
}