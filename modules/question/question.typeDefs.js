import{gql}from"graphql-tag";const questionTypeDefs=gql`

# Enums
enum QuestionType {
  simple_answer
  multiple_choice
  match_answers
  information
  fill_gaps
  free_text
  grid
  attachment
}

enum DifficultyLevel {
  easy
  medium
  hard
}

enum SelectionMode {
  single
  multiple
}

enum AwardPointsBy {
  per_answer
  all_correct
}

enum AnswerFormat {
  text
  paragraph
  essay
}

enum CellType {
  checkbox
  text
}

# Sub-types
type AnswerOption {
  id: String
  content: String
  isCorrect: Boolean
}

type MatchPair {
  id: String
  option: String
  match: String
}

type Gap {
  id: String
  text: String
  acceptedAnswers: [String]
}

type MarkingInstruction {
  id: String
  points: Int
  description: String
}

type GridCell {
  type: CellType
  value: String
  isCorrect: Boolean
}

type GridRow {
  id: String
  label: String
  cells: [GridCell]
}

type GridColumn {
  id: String
  label: String
}

type Settings {
  enableAutoMarking: Boolean
  caseSensitive: Boolean
  ignoreSpaces: Boolean
  strictPunctuation: Boolean
}

type MarkingRules {
  awardPointsBy: AwardPointsBy
  pointsPerAnswer: Int
  pointsPerMatch: Int
  pointsPerGap: Int
  pointsPerRow: Int
}


# Main Question Type
type Question {
  id: ID!
  code:String
  group_code:String
  tip:String
  staff: [Staff]
  school: [School]
  type: QuestionType!
  mainQuestionId: ID
  # Common fields
  question: String
  content: String
  subject: [Subject]
  tag: String
  difficultyLevel: DifficultyLevel
  points: Int
  totalPoints: Int
  
  # Simple Answer specific
  answers: [String]
  settings: Settings
  
  # Multiple Choice specific
  answerOptions: [AnswerOption]
  selectionMode: SelectionMode
  shuffleAnswers: Boolean
  
  # Match Answers specific
  matchPairs: [MatchPair]
  
  # Fill the Gaps specific
  gaps: [Gap]
  characterLimit: String
  
  # Free Text & Attachment specific
  answerFormat: AnswerFormat
  markingInstructions: [MarkingInstruction]
  
  # Grid specific
  columns: [GridColumn]
  rows: [GridRow]
  shuffleOrder: Boolean
  
  # Marking rules
  markingRules: MarkingRules
  status:String
  is_deleted: Boolean
  date_deleted: String
  createdAt: String
  updatedAt: String
}

# Input types
input AnswerOptionInput {
  id: String
  content: String
  isCorrect: Boolean
}

input MatchPairInput {
  id: String
  option: String
  match: String
}

input GapInput {
  id: String
  text: String
  acceptedAnswers: [String]
}

input MarkingInstructionInput {
  id: String
  points: Int
  description: String
}

input GridCellInput {
  type: CellType
  value: GridCellValue
  isCorrect: Boolean
}

scalar GridCellValue

input GridRowInput {
  id: String
  label: String
  cells: [GridCellInput]
}

input GridColumnInput {
  id: String
  label: String
}

input SettingsInput {
  enableAutoMarking: Boolean
  caseSensitive: Boolean
  ignoreSpaces: Boolean
  strictPunctuation: Boolean
}

input MarkingRulesInput {
  awardPointsBy: AwardPointsBy
  pointsPerAnswer: Int
  pointsPerMatch: Int
  pointsPerGap: Int
  pointsPerRow: Int
}

input AddQuestionInput {
  
  type: QuestionType!
  
  # Common fields
  mainQuestionId: ID
  question: String
  tip:String
  content: String
  subject: String
  tag: String
  difficultyLevel: DifficultyLevel
  points: Int
  totalPoints: Int
  
  # Simple Answer specific
  answers: [String]
  settings: SettingsInput
  
  # Multiple Choice specific
  answerOptions: [AnswerOptionInput]
  selectionMode: SelectionMode
  shuffleAnswers: Boolean
  
  # Match Answers specific
  matchPairs: [MatchPairInput]
  
  # Fill the Gaps specific
  gaps: [GapInput]
  characterLimit: String
  
  # Free Text & Attachment specific
  answerFormat: AnswerFormat
  markingInstructions: [MarkingInstructionInput]
  
  # Grid specific
  columns: [GridColumnInput]
  rows: [GridRowInput]
  shuffleOrder: Boolean
  
  # Marking rules
  markingRules: MarkingRulesInput
}

input UpdateQuestionInput {
  
  type: QuestionType
  
  # Common fields
  question: String
  tip:String
  content: String
  subject: String
  tag: String
  difficultyLevel: DifficultyLevel
  points: Int
  totalPoints: Int
  
  # Simple Answer specific
  answers: [String]
  settings: SettingsInput
  
  # Multiple Choice specific
  answerOptions: [AnswerOptionInput]
  selectionMode: SelectionMode
  shuffleAnswers: Boolean
  
  # Match Answers specific
  matchPairs: [MatchPairInput]
  
  # Fill the Gaps specific
  gaps: [GapInput]
  characterLimit: String
  
  # Free Text & Attachment specific
  answerFormat: AnswerFormat
  markingInstructions: [MarkingInstructionInput]
  
  # Grid specific
  columns: [GridColumnInput]
  rows: [GridRowInput]
  shuffleOrder: Boolean
  
  # Marking rules
  markingRules: MarkingRulesInput
}


input ExcelInput{
 subject: String
 tag: String
 group_code: String
 excelFile: String
}

type Query {
  questions: [Question]
  getQuestionById(id: ID!): Question
  getQuestionsByIds(ids: [ID]!): [Question]
  getSubQuestions(mainQuestionId: ID!): [Question]
  getQuestionsByType(type: QuestionType!): [Question]
  getQuestionTags: [String]
  getQuestionsInExcel(count: Int): String
  exportQuestionsToExcel(questionIds: [ID], searchTerm: String, subject: ID, difficulty: String, tag: String, status: String): String
  searchQuestions(subject: [ID], tag: [String], group_code: String, question_code: String, type: [QuestionType], difficulty: [DifficultyLevel]): [Question]

}

type Mutation {
importQuestionInExcel(data: ExcelInput!): ResponsePayload
  addQuestion(data: AddQuestionInput!): ResponsePayload
  updateQuestion(id: ID!, data: UpdateQuestionInput!): ResponsePayload
  duplicateQuestion(id: ID!): ResponsePayload
  deleteQuestion(id: ID!): ResponsePayload
  deleteMultipleQuestions(data: [ID]): ResponsePayload
  updateMultipleQuestionsStatus(data: [ID]!, status: String!): ResponsePayload
}
`;export default questionTypeDefs;