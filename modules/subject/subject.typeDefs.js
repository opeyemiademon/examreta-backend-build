import{gql}from"graphql-tag";const subjectTypeDefs=gql`

type Subject {
  id: ID!
  school: [School]
  title: String
  createdAt: String
  updatedAt: String
}

type Query {
  subjects: [Subject]
  getSubjectById(id: ID!): Subject
  getSubjectsBySchool: [Subject]
}

input AddSubjectInput {
  title: String!
}

input UpdateSubjectInput {
  school: String
  title: String
}

type Mutation {
  addSubject(data: AddSubjectInput!): ResponsePayload
  updateSubject(id: ID!, data: UpdateSubjectInput!): ResponsePayload
  deleteSubject(id: ID!): ResponsePayload
  deleteMultipleSubjects(data: [ID]): ResponsePayload
}

`;export default subjectTypeDefs;