function analyzeFailure(task) {
  const lowerTask = task.toLowerCase();

  if (
    lowerTask.includes("fact") ||
    lowerTask.includes("capital") ||
    lowerTask.includes("date") ||
    lowerTask.includes("who")
  ) {
    return {
      failureDetected: true,
      failureType: "FACTUAL_ERROR",
      rootCause: "The response contains unsupported or unverified factual information",
      repairStrategy: "Add VerificationAgent to verify factual claims"
    };
  }

  if (
    lowerTask.includes("calculate") ||
    lowerTask.includes("solve") ||
    lowerTask.includes("logic")
  ) {
    return {
      failureDetected: true,
      failureType: "REASONING_ERROR",
      rootCause: "The task requires additional reasoning validation",
      repairStrategy: "Add ReasoningAgent to validate the solution"
    };
  }

  return {
    failureDetected: false,
    failureType: null,
    rootCause: null,
    repairStrategy: null
  };
}

module.exports = {
  analyzeFailure
};