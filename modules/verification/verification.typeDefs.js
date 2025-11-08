import{gql}from"graphql-tag";const verificationTypeDefs=gql`


type Verification{
    id:ID!
    token:String!
    email_address:String!
  status:String!
    createdAt:String
    updatedAt:String
}

type Query{
verify(token:String!):Verification
}


input AddVerificationInput {

    token:String!
    email_address:String!
  status:String!
}



type Mutation{

    addVerification(data:AddVerificationInput!):ResponsePayload
    updateVerification(token:String!, status:String!):ResponsePayload
}


`;export default verificationTypeDefs;