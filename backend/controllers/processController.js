const { analyzeFailure } = require("../services/aiService");

const {
  storeFailure,
  findSimilarFailures,
  getBestRepairStrategy
} = require("../services/memoryService");

const processTask = (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      error: "Task is required"
    });
  }

  // Temporary mock AI response
  const initialAnswer = `Initial AI response for: ${task}`;

  // Analyze the task for possible failure
  const analysis = analyzeFailure(task);

  const {
    failureDetected,
    failureType,
    rootCause,
    repairStrategy
  } = analysis;

  // Check whether AEGIS has seen this failure before
  const similarFailures = failureDetected
    ? findSimilarFailures(failureType)
    : [];

  // Select the best repair strategy from past failures
  const learnedStrategy = failureDetected
    ? getBestRepairStrategy(failureType)
    : null;

  // Format retrieved memory for the response
  const memoryUsed = similarFailures.map((failure) => ({
    failureType: failure.failureType,
    rootCause: failure.rootCause,
    repairStrategy: failure.repairStrategy
  }));

  // Original architecture
  const architectureBefore = [
    "Generator",
    "Evaluator"
  ];

  // Adapt architecture based on detected failure
  let architectureAfter = [...architectureBefore];

  if (failureDetected && failureType === "FACTUAL_ERROR") {
    architectureAfter = [
      "Generator",
      "VerificationAgent",
      "Evaluator"
    ];
  } else if (failureDetected && failureType === "REASONING_ERROR") {
    architectureAfter = [
      "Generator",
      "ReasoningAgent",
      "Evaluator"
    ];
  }

  // Temporary improved response
  const finalAnswer = failureDetected
    ? `Improved response after self-repair for: ${task}`
    : `No failure detected. Original response accepted for: ${task}`;

  // Store only actual failures
  let storedFailure = null;

  if (failureDetected) {
    storedFailure = storeFailure({
      task,
      failureType,
      rootCause,
      repairStrategy: learnedStrategy || repairStrategy,
      resolved: true
    });
  }

  return res.status(200).json({
    sessionId: Date.now().toString(),
    task,
    initialAnswer,
    failureDetected,
    failureType,
    rootCause,
    memoryUsed,
    learnedFromMemory: learnedStrategy !== null,
    selectedRepairStrategy: learnedStrategy || repairStrategy,
    architectureBefore,
    architectureAfter,
    finalAnswer,
    storedFailure
  });
};

module.exports = {
  processTask
};