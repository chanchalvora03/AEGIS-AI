class SequenceFakeLLM:
    """
    Fake LLM that returns different results
    on consecutive calls.
    """

    def __init__(self, results):
        self.results = results
        self.call_count = 0

    def generate_json(self, prompt: str) -> dict:

        if self.call_count >= len(self.results):
            raise RuntimeError(
                "SequenceFakeLLM ran out of responses"
            )

        result = self.results[self.call_count]

        self.call_count += 1

        return result