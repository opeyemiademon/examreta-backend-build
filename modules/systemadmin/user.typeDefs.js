import{gql}from"graphql-tag";const userTypeDefs=gql`



type User{
    id:ID
    firstName:String
    lastName:String
    email_address:String
    telephone:String
    academicLevel:String
    status:String
    department:[Department]
    institution:String
    createdAt:String
    updatedAt:String
}


type Login{
  message:String
  session_id:String
  type:String
    token:String
    user:User
    expires_in:String
    status:Int
}

type Query{
users:[User]
getUserById(id:ID!):User
}


input AddUserInput {

    firstName:String!
    lastName:String!
    email_address:String!
    password:String!
    telephone:String!
    academicLevel:String!
} 




input UpdateUserInput {

   firstName:String!
    lastName:String!
    email_address:String!
  department:String
  institution:String
    telephone:String!
    academicLevel:String!
}

type Mutation{

login(email_address:String!, password:String!):Login
    deleteUser(id:ID!):ResponsePayload
    addUser(data:AddUserInput!):ResponsePayload
    updateUser(id:ID!, data:UpdateUserInput!):ResponsePayload
     verifyOTP(email_address:String!, otp:String!):ResponsePayload
     resendOTP(email_address:String!):ResponsePayload
}


`;export default userTypeDefs;