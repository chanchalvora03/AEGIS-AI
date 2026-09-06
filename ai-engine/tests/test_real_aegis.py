from agents.generator import GeneratorAgent
from agents.evaluator import EvaluatorAgent
from agents.verification_agent import VerificationAgent
from core.agent_manager import AgentManager
from core.aegis_engine import AEGISEngine
from core.repair_engine import RepairEngine


class FaultyRealGenerator:
    """
    Produces an intentionally incorrect answer
    so the real Ollama evaluator and repair agent
    can be tested.
    """

    def generate(self, task):
        return "Penicillin was discovered by Marie Curie."


def main():

    print("\n========== REAL OLLAMA AEGIS TEST ==========\n")

    generator = FaultyRealGenerator()
    evaluator = EvaluatorAgent()

    verification_agent = VerificationAgent()

    agent_manager = AgentManager(
        verification_agent=verification_agent
    )

    repair_engine = RepairEngine(
        agent_manager=agent_manager
    )

    engine = AEGISEngine(
        generator=generator,
        evaluator=evaluator,
        agent_manager=agent_manager,
        repair_engine=repair_engine
    )

    result = engine.process(
        "Who discovered penicillin?"
    )

    print("INITIAL ANSWER:")
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


if __name__ == "__main__":
    main()