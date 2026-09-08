from agents.evaluator import EvaluatorAgent
from tests.fake_llm import FakeLLM


# --------------------------------------------------
# TEST 1: Correct response
# --------------------------------------------------

correct_llm = FakeLLM({
    "failureDetected": False,
    "failureType": "NO_ERROR",
    "rootCause": None
})

correct_evaluator = EvaluatorAgent(correct_llm)

result1 = correct_evaluator.evaluate(
    "Who discovered penicillin?",
    "Penicillin was discovered by Alexander Fleming in 1928."
)

print("TEST 1 - CORRECT RESPONSE")
print(result1)


# --------------------------------------------------
# TEST 2: Factual error
# --------------------------------------------------

factual_llm = FakeLLM({
    "failureDetected": True,
    "failureType": "FACTUAL_ERROR",
    "rootCause": (
        "The answer incorrectly attributes "
        "the discovery of penicillin."
    )
})

factual_evaluator = EvaluatorAgent(factual_llm)

result2 = factual_evaluator.evaluate(
    "Who discovered penicillin?",
    "Penicillin was discovered by Marie Curie."
)

print("\nTEST 2 - FACTUAL ERROR")
print(result2)


# --------------------------------------------------
# TEST 3: Reasoning error
# --------------------------------------------------

reasoning_llm = FakeLLM({
    "failureDetected": True,
    "failureType": "REASONING_ERROR",
    "rootCause": (
        "The mathematical reasoning contains "
        "an incorrect step."
    )
})

reasoning_evaluator = EvaluatorAgent(reasoning_llm)

result3 = reasoning_evaluator.evaluate(
    "What is 15 × 27?",
    "15 × 27 = 300."
)

print("\nTEST 3 - REASONING ERROR")
print(result3)