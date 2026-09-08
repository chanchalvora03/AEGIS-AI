from agents.evaluator import EvaluatorAgent
from core.failure_classifier import FailureClassifier


evaluator = EvaluatorAgent()
classifier = FailureClassifier()

task = "Who discovered penicillin?"

# Incorrect answer intentionally used to trigger a failure
answer = "Penicillin was discovered by Marie Curie."

evaluation = evaluator.evaluate(task, answer)

classification = classifier.classify(
    task,
    answer,
    evaluation
)

print("EVALUATION:")
print(evaluation)

print("\nCLASSIFICATION:")
print(classification)