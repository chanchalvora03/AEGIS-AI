from agents.evaluator import EvaluatorAgent
from core.aegis_engine import AEGISEngine
from tests.sequence_fake_llm import SequenceFakeLLM


# --------------------------------------------------
# Fake Generator
# --------------------------------------------------

class FaultyGenerator:

    def generate(self, task: str) -> str:
        return "Penicillin was discovered by Marie Curie."


# --------------------------------------------------
# Fake Gemini responses
# --------------------------------------------------

fake_llm = SequenceFakeLLM([
    {
        "failureDetected": True,
        "failureType": "FACTUAL_ERROR",
        "rootCause": (
            "The response incorrectly attributes "
            "the discovery of penicillin."
        )
    },
    {
        "failureDetected": False,
        "failureType": "NO_ERROR",
        "rootCause": None
    }
])


# --------------------------------------------------
# Inject dependencies
# --------------------------------------------------

evaluator = EvaluatorAgent(fake_llm)

engine = AEGISEngine(
    generator=FaultyGenerator(),
    evaluator=evaluator
)


# --------------------------------------------------
# Run AEGIS
# --------------------------------------------------

result = engine.process(
    "Who discovered penicillin?"
)


# --------------------------------------------------
# Display result
# --------------------------------------------------

print("\n========== AEGIS RESULT ==========")

print("\nINITIAL ANSWER:")
print(result["initialAnswer"])

print("\nFAILURE DETECTED:")
print(result["failureDetected"])

print("\nFAILURE TYPE:")
print(result["failureType"])

print("\nROOT CAUSE:")
print(result["rootCause"])

print("\nREPAIR STRATEGY:")
print(result["repairStrategy"])

print("\nAGENT USED:")
print(result["agentUsed"])

print("\nARCHITECTURE BEFORE:")
print(result["architectureBefore"])

print("\nARCHITECTURE AFTER:")
print(result["architectureAfter"])

print("\nFINAL ANSWER:")
print(result["finalAnswer"])

print("\nFINAL EVALUATION:")
print(result["finalEvaluation"])

print("\nRESOLVED:")
print(result["resolved"])