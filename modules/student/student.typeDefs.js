import{gql}from"graphql-tag";const studentTypeDefs=gql`

# Enums
scalar JSON

enum QuestionType {
  simple_answer
  multiple_choice
  match_answers
  fill_gaps
  free_text
  grid
  attachment
}

enum SecurityEventType {
  tab_switch
  window_blur
  fullscreen_exit
  copy_attempt
  paste_attempt
  right_click
  keyboard_shortcut
  browser_extension_detected
  multiple_tabs_detected
  screen_recording_blocked
  suspicious_activity
  exam
  scores
}

enum SessionStatus {
  not_started
  in_progress
  paused
  completed
  submitted
  abandoned
  timed_out
  disqualified
}

enum DeviceType {
  desktop
  mobile
  tablet
}

enum MarkingStatus {
  pending
  in_progress
  completed
}

# Sub-types
type StudentAnswer {
  id: ID!
  questionId: ID!
  questionType: QuestionType!
  
  # Question content
  questionText: String
  questionOptions: JSON
  questionCorrectAnswer: String
  questionPoints: Float
  questionInstruction: String
  questionAttachments: [String]
  
  # Student's answer
  answer: JSON
  isCorrect: Boolean
  pointsAwarded: Float
  maxPoints: Float
  timeSpent: Int
  attemptCount: Int
  markedAt: String
  feedback: String
  attachments: [String]
  answeredAt: String
  createdAt: String
  updatedAt: String
}



type StudentExamResult {
  examId: ID
  examTitle: String
  examFormat: String
  score: Float
  maxScore: Float
  totalQuestions: Int
  percentage: Float
  correctAnswers: Int
  incorrectAnswers: Int
  unanswered: Int
  durationSeconds: Int
  submittedAt: String
  grade: String
  settings: ExamSettingsSnapshot
}


type SecurityEvent {
  id: ID!
  eventType: SecurityEventType
  timestamp: String
  details: String
  ipAddress: String
  userAgent: String
}

type IPAddressRecord {
  ip: String
  timestamp: String
  location: String
}

type ScreenCapture {
  url: String
  timestamp: String
  reason: String
}

type ExamSettingsSnapshot {
  shuffleQuestions: Boolean
  shuffleAnswers: Boolean
  allowSkip: Boolean
  showResult: Boolean
  lockdownMode: String
  enabledTools: [String]
  percentagePass: Boolean
}

type ExamSession {
  id: ID!
  examId: ID!
  resumeKey: String
  status: SessionStatus
  
  # Time Tracking
  startTime: String
  endTime: String
  pausedAt: String
  resumedAt: String
  submittedAt: String
  totalPauseDuration: Int
  timeLimit: Int
  timeRemaining: Int
  timeElapsed: Int
  
  # Answers
  answers: [StudentAnswer]
  answerContent: String
  
  # Scoring
  totalScore: Float
  maxScore: Float
  percentageScore: Float
  passed: Boolean
  autoMarked: Boolean
  manualMarkingRequired: Boolean
  markingStatus: MarkingStatus
  
  # Security & Tracking
  ipAddress: String
  ipAddresses: [IPAddressRecord]
  location: String
  userAgent: String
  
  # Login & Access
  loginAttempts: Int
  lastLoginAttempt: String
  accessGranted: Boolean
  accessDeniedReason: String
  
  # Security Events
  securityEvents: [SecurityEvent]
  tabSwitchCount: Int
  fullscreenExitCount: Int
  suspiciousActivityCount: Int
  
  # Proctoring
  screenRecordingEnabled: Boolean
  screenRecordingUrl: String
  webcamRecordingUrl: String
  screenCaptures: [ScreenCapture]
  
  # Exam Settings
  examSettings: ExamSettingsSnapshot
  
  # Question Management
  questionOrder: [ID]
  currentQuestionIndex: Int
  questionsAttempted: Int
  questionsSkipped: Int
  progressPercentage: Float
  
  # Notes & Flags
  teacherNotes: String
  flaggedForReview: Boolean
  flagReason: String
  
  # Metadata
  attemptNumber: Int
  isRetake: Boolean
  previousAttemptId: ID
  
  createdAt: String
  updatedAt: String
}

# Main Student Type
type Student {
  id: ID!
  examKey: String!
  firstName: String
  lastName: String
  email: String
  studentNumber: String
  class: String
  telephone: String
  teacherName: String
  resumeKey:String
  # References
  exam: Exam
  school: School
  
  # Sessions
  examSessions: [ExamSession]
  currentSessionId: ID
  
  # Statistics
  totalAttempts: Int
  bestScore: Float
  averageScore: Float
  lastAttemptDate: String
  
  # Account Status
  isActive: Boolean
  isBlocked: Boolean
  blockReason: String
  blockedAt: String
  
  # Communication
  emailSent: Boolean
  emailSentAt: String
  
  # Soft Delete
  is_deleted: Boolean
  date_deleted: String
  
  createdAt: String
  updatedAt: String
}

# Input Types
input StudentAnswerInput {
  questionId: ID!
  questionType: QuestionType!
  
  # Question content
  questionText: String
  questionOptions: JSON
  questionCorrectAnswer: String
  questionPoints: Float
  questionInstruction: String
  questionAttachments: [String]
  isCorrect: Boolean
  # Student's answer
  answer: JSON
  maxPoints: Float
  timeSpent: Int
  attachments: [String]
}

input SecurityEventInput {
  eventType: SecurityEventType!
  details: String
  ipAddress: String
  userAgent: String
}

input IPAddressInput {
  ip: String!
  timestamp: String
  location: String
}

input ScreenCaptureInput {
  url: String!
  timestamp: String
  reason: String
}

input ExamSettingsSnapshotInput {
  shuffleQuestions: Boolean
  shuffleAnswers: Boolean
  allowSkip: Boolean
  showResult: Boolean
  lockdownMode: String
  enabledTools: [String]
}

input RegisterStudentInput {
  examKey: String!
  firstName: String
  lastName: String
  email: String
  studentNumber: String
  class: String
  telephone: String
  teacherName: String
  examId: ID!
  schoolId: ID
}

input UploadStudentsInput {
  examId: ID!
  schoolId: ID
  excelFile: String!
}

input StartExamSessionInput {
  studentId: ID!
  examId: ID!
  questionOrder: [ID]
}

input SubmitAnswerInput {
  
  studentId: ID!
  timeRemaining: Int!
  examFormat: String!
  answerContent: String
  isCorrect: Boolean
  questionId: ID
  questionType: QuestionType
  questionText: String
  questionOptions: JSON
  questionCorrectAnswer: String
  questionPoints: Float
  questionInstruction: String
  questionAttachments: JSON
  answer:  JSON
  maxPoints: Float
    pointsAwarded: Float
  timeSpent: Int
  attachments: JSON
}

input UploadAttachmentInput {
  studentId: ID!
  questionId: ID!
  examKey: String!
  imageBase64: String!
}

input UpdateSessionProgressInput {
  studentId: ID!
  sessionId: ID!
  currentQuestionIndex: Int
  questionsAttempted: Int
  questionsSkipped: Int
  progressPercentage: Float
  timeElapsed: Int
  timeRemaining: Int
}

input UpdateExamTimeInput {
  examId: ID!
  timeInMinutes: Int!
  studentId: ID
}

input UpdateTimeRemainingInput {
  studentId: ID!
  timeRemaining: Int!
  answerContent: String
  examType: String
}

input RecordSecurityEventInput {
  studentId: ID!
  eventType: SecurityEventType!
  details: String
}

input SubmitExamInput {

  studentId: ID!
  timeRemaining: Int!
  examFormat: String!
  answerContent: String
}

input SubmitExamForAllInput {
  examId: ID!
  studentId: ID
}

input RegradeScoresInput {
  examId: ID!
  studentId: ID
}

input UpdateStudentInput {
  firstName: String
  lastName: String
  email: String
  studentNumber: String
  class: String
  telephone: String
  teacherName: String
}

input PauseExamInput {
  studentId: ID!
  sessionId: ID!
}

input ResumeExamInput {
  studentId: ID!
  sessionId: ID!
  resumeKey: String
}

input BlockStudentInput {
  studentId: ID!
  blockReason: String!
}

input UpdateAnswerInput {
  studentId: ID!
  answerId: ID!
  
  # Question content (optional - can be updated if needed)
  questionText: String
  questionOptions: JSON
  questionCorrectAnswer: String
  questionPoints: Float
  questionInstruction: String
  questionAttachments: JSON
  isCorrect: Boolean
    pointsAwarded: Float
    maxPoints: Float

  answer: JSON
  timeSpent: Int
  timeRemaining: Int
  attachments: JSON
}

input BulkAnswerInput {
  questionId: ID!
  answer: JSON!
  timeSpent: Int
  attachments: JSON
  isUpdate: Boolean!
}

input BulkSubmitAnswersInput {
  studentId: ID!
  sessionId: ID!
  answers: [BulkAnswerInput!]!
  examFormat: String!
  timeRemaining: Int!
}

type BulkSubmitAnswersResponse {
  status: Int!
  type: String!
  message: String!
  successCount: Int!
  failureCount: Int!
}

type StudentLoginResponsePayload {
  status: Int!
  type: String!
  message: String!
  studentId: ID
  examId: ID
  examKey: String
  token: String
}

input QuestionPointInput {
  questionId: ID!
  pointsAwarded: Float!
}

input UpdateQuestionPointsInput {
  studentId: ID!
  points: [QuestionPointInput!]!
}

# Queries
type Query {
  students: [Student]
  getStudentById(id: ID!): Student
  getStudentsByExam(examId: ID!): [Student]
  getStudentsByExamKey(examKey: String!): [Student]
  getStudentSession(studentId: ID!, sessionId: ID!): ExamSession
  getCurrentSession(studentId: ID!): ExamSession
  getStudentExamResult(studentId: ID!): StudentExamResult
  getStudentAnswerPDF(id: ID!): String
  getAllStudentAnswerPDF(examId: ID!, showName:Boolean!): String
  getAllAnswerPDF(examId: ID!): String
  getAllAnswerExcel(examId: ID!): String
  getStudentAttendanceExcel(examId: ID!): String
  getAllStudentExamKeyPDF(examId: ID!): String
}




# Mutations
type Mutation { 

  verifyResumeKey(resumeKey: String!): StudentLoginResponsePayload
  registerStudent(data: RegisterStudentInput!): StudentLoginResponsePayload
  startExamSession(data: StartExamSessionInput!): Student
  submitAnswer(data: SubmitAnswerInput!): ResponsePayload
  updateAnswer(data: UpdateAnswerInput!): ResponsePayload
  bulkSubmitAnswers(data: BulkSubmitAnswersInput!): BulkSubmitAnswersResponse
  updateSessionProgress(data: UpdateSessionProgressInput!): ResponsePayload
  recordSecurityEvent(data: RecordSecurityEventInput!): ResponsePayload
  submitExam(data: SubmitExamInput!): ResponsePayload
  submitExamForAll(data: SubmitExamForAllInput!): ResponsePayload
  regradeExamScores(data: RegradeScoresInput!): ResponsePayload
  pauseExam(data: PauseExamInput!): ResponsePayload
  resumeExam(data: ResumeExamInput!): ResponsePayload
  updateExamSessionsTimeRemaining(data: UpdateExamTimeInput!): ResponsePayload
  updateTimeRemaining(data: UpdateTimeRemainingInput!): ResponsePayload
  updateStudent(id: ID!, data: UpdateStudentInput!): ResponsePayload
  blockStudent(data: BlockStudentInput!): ResponsePayload
  unblockStudent(studentId: ID!): ResponsePayload
  deleteStudent(id: ID!): ResponsePayload
  deleteMultipleStudents(data: [ID]): ResponsePayload
  markAnswer(studentId: ID!, sessionId: ID!, answerId: ID!, pointsAwarded: Float!, feedback: String): ResponsePayload
  flagSessionForReview(studentId: ID!, sessionId: ID!, reason: String!): ResponsePayload
  addTeacherNotes(studentId: ID!,  notes: String!): ResponsePayload
  uploadStudentsByExcel(data: UploadStudentsInput!): ResponsePayload
  uploadAttachment(data: UploadAttachmentInput!): ResponsePayload
  updateQuestionPoints(data: UpdateQuestionPointsInput!): ResponsePayload
  resumeSubmittedExam(studentId: ID!): ResponsePayload
}
`;export default studentTypeDefs;