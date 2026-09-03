# AEGIS API Contract

## Main Processing Flow

POST /api/process

### Request

{
  "task": "User's input"
}

### Response

{
  "sessionId": "123",
  "initialAnswer": "Initial AI response",
  "failureDetected": true,
  "failureType": "FACTUAL_ERROR",
  "rootCause": "Unsupported or unverified information",
  "memoryUsed": [],
  "architectureBefore": [
    "Generator",
    "Evaluator"
  ],
  "architectureAfter": [
    "Generator",
    "VerificationAgent",
    "Evaluator"
  ],
  "finalAnswer": "Improved AI response"
}