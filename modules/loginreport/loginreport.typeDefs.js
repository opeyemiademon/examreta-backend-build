import{gql}from"graphql-tag";const loginreportTypeDefs=gql`


type Loginreport{
    id:ID!
    staff:[Staff]
    school:[School]
    ip:String!
    device:String!
    location:String!
    status:String!
    usertype:String
    duration:String!
    createdAt:String
    updatedAt:String
}

type Query{
loginReports:[Loginreport]
loginreport(id:ID!):[Loginreport]
}


input AddLoginreportInput {

   staff:String!
   school:String!
   ip:String!
   device:String!
   location:String!
   status:String!
   duration:String!
}



type Mutation{
deleteMultipleLoginReport(data:[ID]):ResponsePayload
    addLoginReport(data:AddLoginreportInput!):ResponsePayload
    updateLoginReport(id:ID!, data:AddLoginreportInput!):ResponsePayload
}


`;export default loginreportTypeDefs;