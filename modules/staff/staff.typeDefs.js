import{gql}from"graphql-tag";const staffTypeDefs=gql`

type ResponsePayload {
    status: Int!
  type: String 
  message:String!
}



type Login{
  message:String
  session_id:String
  type:String
    token:String
    staff_id:String
    expires_in:String
    status:Int
}


type Staff{
    id:ID!
    staff_id:String
   fullname:String
   email_address:String
   is_two_factor:Boolean
   password:String
   telephone:String
   country:String
   gender:String
   role:String
   status:String
   permission:[String]
   photo:String
    allow_newletter:String
      allow_email_notification:String
   is_email_verify:Boolean
   is_phone_verify:Boolean
    createdAt:String
    updatedAt:String
}



type SchoolStaff {
    school:[School]
    staff:[Staff]
}

type StaffRegistrationInfo {
    school_name:String
    staff_name:String
    status:Int
    type:String
    message:String
}


type Query{
staffs:[Staff]
getStaffById:Staff
getSchoolStaff:SchoolStaff
getStaffAndSchoolForRegistration(schoolId:ID!, staffId:ID!):StaffRegistrationInfo
}


input AddStaffInput {

    fullname:String!
    email_address:String!
    school:String!
    password:String!
    telephone:String!
    address:String!
    hear_about_us:String!
    country:String!
    website:String!

}




input UpdateStaffInput {

   fullname:String
   first_name:String
    last_name:String
    gender:String
    role:String
    permission:[String]
    is_two_factor:Boolean
    status:String
    telephone:String
}


input UpdateStaffNameInput {
    fullname:String!
}

input UpdateStaffEmailInput {
    email_address:String!
    current_password:String!
}

input UpdateStaffPasswordInput {
    current_password:String!
    new_password:String!
}

input RegisterStaffInput {
    schoolId:ID!
    staffId:ID!
    fullname:String!
    email_address:String!
    password:String!
    telephone:String!
}


type Mutation{
staffLogin(email_address:String!, password:String!):Login
    deleteStaff(id:ID!):ResponsePayload
    addStaff(data:AddStaffInput!):ResponsePayload
    updateStaff(id:ID!, data:UpdateStaffInput!):ResponsePayload
    updateStaffName(data:UpdateStaffNameInput!):ResponsePayload
    updateStaffEmail(data:UpdateStaffEmailInput!):ResponsePayload
    updateStaffPassword(data:UpdateStaffPasswordInput!):ResponsePayload
    registerStaff(data:RegisterStaffInput!):ResponsePayload
}


`;export default staffTypeDefs;