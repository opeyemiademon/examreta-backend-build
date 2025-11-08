import{gql}from"graphql-tag";const schoolTypeDefs=gql`

type School {
  id: ID!
  name: String
  address: String
  website: String
  status: String
  settings: String
  payment: String
  is_deleted: Boolean
  date_deleted: String
  createdAt: String
  updatedAt: String
}

type Query {
  schools: [School]
  getSchoolById(id: ID!): School
}

input AddSchoolInput {
  name: String!
  address: String
  website: String
  status: String
  settings: String
  payment: String
}

input UpdateSchoolInput {
  name: String
  address: String
  website: String
  status: String
  settings: String
  payment: String
}

type Mutation {
  addSchool(data: AddSchoolInput!): ResponsePayload
  updateSchool(id: ID!, data: UpdateSchoolInput!): ResponsePayload
  deleteSchool(id: ID!): ResponsePayload
  deleteMultipleSchools(data: [ID]): ResponsePayload
}

`;export default schoolTypeDefs;