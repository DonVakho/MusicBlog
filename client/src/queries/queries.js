import { gql } from 'apollo-boost'
const GET_POSTS = gql`{
    posts{
        title,
        description
    }
}`

const GET_USERS = gql`{
    users{
        firstName,
        lastName
    }
}`
const GET_AUTHORIZARION = gql`
    query getConfirmation($email: String!, $password: String!){
    userConf(email: $email, password:$password){
        firstName
    }
}`
const ADD_COMMENT = gql`
    mutation($text: String!, $postid: String!, $userid: String!){
    addComment(text: $text, postid: $postid, userid: $userid){
      text
    }
  }
`
export {
    GET_POSTS,
    GET_USERS,
    GET_AUTHORIZARION,
    ADD_COMMENT
}