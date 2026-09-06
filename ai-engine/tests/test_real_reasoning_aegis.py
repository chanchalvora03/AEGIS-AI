from agents.evaluator import EvaluatorAgent
from agents.reasoning_agent import ReasoningAgent
from core.agent_manager import AgentManager
from core.aegis_engine import AEGISEngine
from core.repair_engine import RepairEngine


class FaultyReasoningGenerator:
    """
    Produces an intentionally incorrect mathematical answer.
    """

    def generate(self, task):
        return (
            "The final price is $18 because "
            "25% of $20 is $2."
        )


def main():

    print("\n========== REAL REASONING AEGIS TEST ==========\n")

    generator = FaultyReasoningGenerator()
    evaluator = EvaluatorAgent()

    reasoning_agent = ReasoningAgent()

    agent_manager = AgentManager(
        reasoning_agent=reasoning_agent
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
        "If a shirt costs $20 and is discounted by 25%, "
        "what is the final price?"
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