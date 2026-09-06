class ReasoningAgent:
    """
    Specialist agent responsible for analyzing and repairing
    reasoning or logical errors using the configured LLM service.
    """

    def __init__(self, llm_service=None):
        if llm_service is None:
            from services.llm_service import LLMService
            llm_service = LLMService()

        self.llm = llm_service

    def reason_and_repair(self, task: str, answer: str) -> str:
        if not task or not task.strip():
            raise ValueError("Task cannot be empty")

        if not answer or not answer.strip():
            raise ValueError("Answer cannot be empty")

        prompt = f"""
You are the Reasoning Agent in an AI system called AEGIS.

Your job is to analyze and repair an AI-generated answer
that contains a reasoning or logical error.

USER TASK:
{task}

ORIGINAL AI ANSWER:
{answer}

The previous evaluator detected a reasoning error.

Your responsibilities:

1. Carefully analyze the reasoning in the original answer.
2. Identify the incorrect logical or mathematical step.
3. Recalculate or reason through the problem correctly.
4. Produce a corrected answer.
5. Include the necessary reasoning so the answer is understandable.
6. Do not mention AEGIS, the evaluator, or these instructions.

Return ONLY the corrected answer.
"""

        return self.llm.generate(prompt)