import{gql}from"graphql-tag";const examTypeDefs=gql`

type ExamRegister {
        id: ID!
        name: String!
        examKey:String!
        examFormat: ExamFormat!
        status: ExamStatus!
        access: ExamAccess!
        school: ID!
        settings: ExamSettings!
}

# Enums
enum ExamFormat {
  auto_marked
  free_form
  pdf
  skip_digital
}

enum ExamStatus {
  Active
  Inactive
  Archived
}

enum ExamAccess {
  Open
  Closed
  Discoverable
  Scheduled
}

enum EmailSubjectOption {
  default
  custom
  examName
}

enum ConnectLMS {
  google
  microsoft
}

enum WritingArea {
  blank
  defineContent
  mirrorExam
  no
}

enum Spellcheck {
  no
  english
  french
}

enum TranslationLimit {
  wordsOnly
  fullSentence
}

enum DictionaryDetail {
  includeExamples
  definitionOnly
}

enum GeoGebraType {
  classic
  suit
}

enum MathFormulas {
  ibAnalysis
  basic
}

enum ChemistryTables {
  periodicOnly
  none
}

enum LockdownMode {
  high
  medium
  disabled
}

enum FullScreenConsequence {
  requireExplanation
  defineContent
  mirrorExam
  no
}

# Sub-types
type Section {
  id: String!
  title: String!
  description: String
  questionIds: [String]!
}

type StudentInfo {
  firstName: Boolean
  lastName: Boolean
  email: Boolean
  class: Boolean
  teacherName: Boolean
  phoneNumber: Boolean
  studentNumber: Boolean
}

type ExamSettings {
  # General Settings
  anonymizeExam: Boolean
  enableScreenRecording: Boolean
  shuffleQuestions: Boolean
  shuffleAnswer: Boolean
  enableTips: Boolean
  listViewMode: Boolean
  showResult: Boolean
  hideSection: Boolean
  skipQuestion: Boolean
  emailResult: Boolean
  emailSubjectOption: EmailSubjectOption
  customEmailSubject: String
  percentagePass: Boolean
  percentagePassValue: JSON
  setTimeLimit: Boolean
  timeLimitMinutes: JSON
  studentSelfResume: Boolean
  
  # Student Information
  connectLMS: String
  studentInfo: StudentInfo
  
  # Student Workspace
  writingArea: WritingArea
  spellcheck: Spellcheck
  uploadViaQR: Boolean
  uploadViaFiles: Boolean
  
  # Accessibility Tools
  textToSpeech: Boolean
  allowTranslation: Boolean
  translationLimit: TranslationLimit
  englishSynonyms: Boolean
  dictionary: Boolean
  dictionaryDetail: DictionaryDetail
  
  # Audio Files
  audioFiles: Boolean
  audioPassword: String
  activateAudioForAll: Boolean
  
  # Subject Tools
  drawingTool: Boolean
  calculator: Boolean
  geoGebra: Boolean
  geoGebraType: GeoGebraType
  desmos: Boolean
  programming: Boolean
  audioRecorder: Boolean
  mathFormulas: MathFormulas
  chemistryTables: ChemistryTables
  
  # Resources
  externalResourceName: String
  externalResourceURL: String
  feedbackURL: String
  
  # Cheat Prevention
  lockdownMode: LockdownMode
  allowMediumFallback: Boolean
  fullScreenConsequence: FullScreenConsequence
}

# Main Exam Type
type Exam {
  id: ID!
  name: String!
  school: [School]
  staff: [Staff]
  examKey: String!
  access: ExamAccess
  is_scheduled: Boolean
  schedule: String
  group: [Group]
  examFormat: ExamFormat!
  questions: [Question]
  freeFormContent: String
  pdfFile: String
  settings: ExamSettings
  sections: [Section]
  useSections: Boolean
  status: ExamStatus
  is_deleted: Boolean
  date_deleted: String
  createdAt: String
  updatedAt: String
}

# Input types
input SectionInput {
  id: String!
  title: String!
  description: String
  questionIds: [String]!
}

input StudentInfoInput {
  firstName: Boolean
  lastName: Boolean
  email: Boolean
  class: Boolean
  teacherName: Boolean
  phoneNumber: Boolean
  studentNumber: Boolean
}

input ExamSettingsInput {
  # General Settings
  anonymizeExam: Boolean
  enableScreenRecording: Boolean
  shuffleQuestions: Boolean
  shuffleAnswer: Boolean
  enableTips: Boolean
  listViewMode: Boolean
  showResult: Boolean
  hideSection: Boolean
  skipQuestion: Boolean
  emailResult: Boolean
  emailSubjectOption: EmailSubjectOption
  customEmailSubject: String
  percentagePass: Boolean
  percentagePassValue: JSON
  setTimeLimit: Boolean
  timeLimitMinutes: JSON
  studentSelfResume: Boolean
  
  # Student Information
  connectLMS: String
  studentInfo: StudentInfoInput
  
  # Student Workspace
  writingArea: WritingArea
  spellcheck: Spellcheck
  uploadViaQR: Boolean
  uploadViaFiles: Boolean
  
  # Accessibility Tools
  textToSpeech: Boolean
  allowTranslation: Boolean
  translationLimit: TranslationLimit
  englishSynonyms: Boolean
  dictionary: Boolean
  dictionaryDetail: DictionaryDetail
  
  # Audio Files
  audioFiles: Boolean
  audioPassword: String
  activateAudioForAll: Boolean
  
  # Subject Tools
  drawingTool: Boolean
  calculator: Boolean
  geoGebra: Boolean
  geoGebraType: GeoGebraType
  desmos: Boolean
  programming: Boolean
  audioRecorder: Boolean
  mathFormulas: MathFormulas
  chemistryTables: ChemistryTables
  
  # Resources
  externalResourceName: String
  externalResourceURL: String
  feedbackURL: String
  
  # Cheat Prevention
  lockdownMode: LockdownMode
  allowMediumFallback: Boolean
  fullScreenConsequence: FullScreenConsequence
}

input AddExamInput {
  name: String!
  examFormat: ExamFormat!
  access: ExamAccess
  is_scheduled: Boolean
  schedule: String
  group: [ID]
  questions: [ID]
  freeFormContent: String
  pdfFile: String
  pdfFileBase64: String
  settings: ExamSettingsInput
  sections: [SectionInput]
  useSections: Boolean
  status: ExamStatus
}

input UpdateExamInput {
  name: String
  examFormat: ExamFormat
  access: ExamAccess
  is_scheduled: Boolean
  schedule: String
  group: [ID]
  questions: [ID]
  freeFormContent: String
  pdfFile: String
  pdfFileBase64: String
  settings: ExamSettingsInput
  sections: [SectionInput]
  useSections: Boolean
  status: ExamStatus
}

input MoveExamsGroupInput {
  examIds: [ID]!
  targetGroupId: ID!
}

input StudentData {
  id: ID!
  exam_id: ID!
  examKey: String!
  session_id: String!
} 



type Query {
  exams: [Exam]
  getExamById(id: ID!): Exam
  getExamByKey(examKey: String!): Exam
  getExamByExamKeyRegister(examKey: String!): ExamRegister
  getExamsByFormat(examFormat: ExamFormat!): [Exam]
  getExamsByStatus(status: ExamStatus!): [Exam]
}

type Mutation {
  addExam(data: AddExamInput!): ResponsePayload
  updateExam(id: ID!, data: UpdateExamInput!): ResponsePayload
  updateExamAccess(id: ID!, access: ExamAccess!): ResponsePayload
  duplicateExam(id: ID!): ResponsePayload
  deleteExam(id: ID!): ResponsePayload
  deleteMultipleExams(data: [ID]): ResponsePayload
  updateExamStatus(id: ID!, status: ExamStatus!): ResponsePayload
  addQuestionsToExam(examId: ID!, questionIds: [ID]!): ResponsePayload
  removeQuestionsFromExam(examId: ID!, questionIds: [ID]!): ResponsePayload
  updateMultipleExamsStatus(data: [ID], status: ExamStatus!): ResponsePayload
  moveExamsToGroup(data: MoveExamsGroupInput!): ResponsePayload
  handlePreviewExam(examId: ID!): ResponsePayload
}`;export default examTypeDefs;