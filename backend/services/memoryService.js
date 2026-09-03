const fs = require("fs");
const path = require("path");

const failuresFilePath = path.join(__dirname, "../data/failures.json");

// Read all stored failures
function getAllFailures() {
  try {
    const data = fs.readFileSync(failuresFilePath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

// Store a new failure
function storeFailure(failure) {
  const failures = getAllFailures();

  const newFailure = {
    id: Date.now().toString(),
    ...failure,
    timestamp: new Date().toISOString()
  };

  failures.push(newFailure);

  fs.writeFileSync(
    failuresFilePath,
    JSON.stringify(failures, null, 2)
  );

  return newFailure;
}

// Find recent similar failures
function findSimilarFailures(failureType) {
  const failures = getAllFailures();

  return failures
    .filter((failure) => failure.failureType === failureType)
    .slice(-5)
    .reverse();
}

// Select the most frequently successful repair strategy
function getBestRepairStrategy(failureType) {
  const similarFailures = findSimilarFailures(failureType);

  if (similarFailures.length === 0) {
    return null;
  }

  const strategies = {};

  similarFailures.forEach((failure) => {
    if (failure.repairStrategy) {
      strategies[failure.repairStrategy] =
        (strategies[failure.repairStrategy] || 0) + 1;
    }
  });

  const strategyNames = Object.keys(strategies);

  if (strategyNames.length === 0) {
    return null;
  }

  return strategyNames.reduce((best, current) =>
    strategies[current] > strategies[best] ? current : best
  );
}

module.exports = {
  getAllFailures,
  storeFailure,
  findSimilarFailures,
  getBestRepairStrategy
};