import{gql}from"graphql-tag";const groupTypeDefs=gql`

type Group {
    id: ID!
    name: String!
    color: String!
    is_default: Boolean
    createdAt: String
    updatedAt: String
}

input AddGroupInput {
    name: String!
    color: String!
    is_default: Boolean
}

input UpdateGroupInput {
    name: String
    color: String
    is_default:Boolean
}

type Query {
    groups: [Group]
    getGroupById(id: ID!): Group
}

type Mutation {
    addGroup(data: AddGroupInput!): ResponsePayload
    updateGroup(id: ID!, data: UpdateGroupInput!): ResponsePayload
    deleteGroup(id: ID!): ResponsePayload
    deleteMultipleGroups(data: [ID]): ResponsePayload
}
`;export default groupTypeDefs;