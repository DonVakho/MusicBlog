import React from 'react'

export default function Posts({post: {title, description}}){
    return <>
        <div>
            <h3>{title}</h3>
            <h4>{description}</h4>
            <hr></hr>
        </div>
    </>
}