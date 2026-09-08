class FakeLLM:
    """
    Fake LLM used for local testing.

    It simulates the structured output
    that a real LLM evaluator would return.
    """

    def __init__(self, result):
        self.result = result

    def generate_json(self, prompt: str) -> dict:
        return self.result