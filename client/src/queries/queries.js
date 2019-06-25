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
const GET_USER = gql`
    query($email: String!){
      user(email: $email){
        id
      }
    }
`
const GET_PROFILE = gql`
    query($email: String!){
      user(email: $email){
        firstName,
        lastName,
        created,
        modified,
        posts{
          id,
          title,
          description
          comments{
            id,
            text
          }
        }
      }
    }
`
const GET_AUTHORIZARION = gql`
    query getConfirmation($email: String!, $password: String!){
    userConf(email: $email, password:$password){
        email
    }
}`
const ADD_COMMENT = gql`
    mutation($text: String!, $postid: String!, $userid: String!){
    addComment(text: $text, postid: $postid, userid: $userid){
      text
    }
  }
`
const ADD_USER = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!){
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
      id
    }
  }
`
export {
    GET_POSTS,
    GET_USER,
    GET_USERS,
    GET_PROFILE,
    GET_AUTHORIZARION,
    ADD_COMMENT,
    ADD_USER
}