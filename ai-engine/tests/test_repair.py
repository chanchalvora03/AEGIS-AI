from agents.evaluator import EvaluatorAgent
from core.failure_classifier import FailureClassifier
from core.repair_engine import RepairEngine


task = "Who discovered penicillin?"

# Intentionally incorrect answer
answer = "Penicillin was discovered by Marie Curie."


# 1. Evaluate
evaluator = EvaluatorAgent()

evaluation = evaluator.evaluate(
    task,
    answer
)


# 2. Classify
classifier = FailureClassifier()

classification = classifier.classify(
    task,
    answer,
    evaluation
)


# 3. Repair
repair_engine = RepairEngine()

repair = repair_engine.repair(
    task,
    answer,
    classification["failureType"]
)


print("INITIAL ANSWER:")
print(answer)

print("\nEVALUATION:")
print(evaluation)

print("\nCLASSIFICATION:")
print(classification)

print("\nREPAIR:")
print(repair)