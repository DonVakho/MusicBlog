import React from 'react'
import FormatPost from './FormatPost'

export default function Posts({ posts }) {
    return(
        <>
        {posts.map(post => (
            <FormatPost key={post.id} post={post} />
        ))}
        </>
    )

}