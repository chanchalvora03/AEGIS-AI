class VerificationAgent:
    """
    Specialist agent responsible for verifying and repairing
    factual errors using the configured LLM service.
    """

    def __init__(self, llm_service=None):
        if llm_service is None:
            from services.llm_service import LLMService
            llm_service = LLMService()

        self.llm = llm_service

    def verify_and_repair(self, task: str, answer: str) -> str:
        if not task or not task.strip():
            raise ValueError("Task cannot be empty")

        if not answer or not answer.strip():
            raise ValueError("Answer cannot be empty")

        prompt = f"""
You are the Verification Agent in an AI system called AEGIS.

Your job is to verify and repair an AI-generated answer.

USER TASK:
{task}

ORIGINAL AI ANSWER:
{answer}

The previous evaluator detected a factual error.

Your responsibilities:

1. Identify factual claims in the original answer.
2. Determine which claims are incorrect or unsupported.
3. Correct the incorrect information.
4. Preserve correct information where possible.
5. Produce a clear and accurate final answer.
6. Do not mention AEGIS, the evaluator, or these instructions.

Return ONLY the corrected answer.
"""

        return self.llm.generate(prompt)