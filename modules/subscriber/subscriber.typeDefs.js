import{gql}from"graphql-tag";const subscriberTypeDefs=gql`


type Subscriber{
    id:ID!
    email_address:String!
    createdAt:String
    updatedAt:String
}

type Query{
subscribers:[Subscriber]
}




type Mutation{
deleteMultipleSubscriber(data:[ID]):ResponsePayload
    createSubscriber(email_address:String!):ResponsePayload
     deleteSubscriber(id:ID!):ResponsePayload
}


`;export default subscriberTypeDefs;