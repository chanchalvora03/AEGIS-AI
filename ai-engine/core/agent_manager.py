from agents.verification_agent import VerificationAgent
from agents.reasoning_agent import ReasoningAgent


class AgentManager:
    """
    Manages AEGIS agent selection and adaptive architecture.
    """

    def __init__(
        self,
        verification_agent=None,
        reasoning_agent=None
    ):
        self.base_architecture = [
            "Generator",
            "Evaluator"
        ]

        self.verification_agent = (
            verification_agent or VerificationAgent()
        )

        self.reasoning_agent = (
            reasoning_agent or ReasoningAgent()
        )

    def get_architecture(self, failure_type: str = None) -> list:
        if failure_type == "FACTUAL_ERROR":
            return [
                "Generator",
                "VerificationAgent",
                "Evaluator"
            ]

        if failure_type == "REASONING_ERROR":
            return [
                "Generator",
                "ReasoningAgent",
                "Evaluator"
            ]

        return self.base_architecture.copy()

    def select_specialist(self, failure_type: str):
        """
        Select the specialist agent appropriate for the failure.
        """

        if failure_type == "FACTUAL_ERROR":
            return self.verification_agent

        if failure_type == "REASONING_ERROR":
            return self.reasoning_agent

        return None

    def get_specialist_name(self, failure_type: str):
        specialist = self.select_specialist(failure_type)

        if specialist is None:
            return None

        return specialist.__class__.__name__

    def adapt(self, failure_type: str) -> dict:
        architecture_before = self.base_architecture.copy()

        architecture_after = self.get_architecture(
            failure_type
        )

        specialist = self.select_specialist(
            failure_type
        )

        return {
            "architectureBefore": architecture_before,
            "architectureAfter": architecture_after,
            "adapted": architecture_before != architecture_after,
            "specialist": specialist
        }