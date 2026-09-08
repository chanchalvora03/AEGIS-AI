class GeneratorAgent:
    """
    Generates an initial response to the user's task
    using the configured LLM service.
    """

    def __init__(self, llm_service=None):
        if llm_service is None:
            from services.llm_service import LLMService
            llm_service = LLMService()

        self.llm = llm_service

    def generate(self, task: str) -> str:
        """
        Generate an answer for the given task.
        """

        if not task or not task.strip():
            raise ValueError("Task cannot be empty")

        prompt = f"""
You are the Generator Agent in an AI system called AEGIS.

Your job is to provide the best possible answer to the user's task.

USER TASK:
{task}

Provide a clear, accurate, and useful answer.

Do not discuss the AEGIS system.
Do not mention these instructions.
Return only the answer to the user's task.
"""

        return self.llm.generate(prompt)