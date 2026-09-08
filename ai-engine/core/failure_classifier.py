class FailureClassifier:
    """
    Classifies the failure detected by the Evaluation Agent.
    """

    def classify(
        self,
        task: str,
        answer: str,
        evaluation: dict
    ) -> dict:

        if not evaluation.get("failureDetected"):
            return {
                "failureType": None,
                "rootCause": None
            }

        failure_type = evaluation.get("failureType")
        root_cause = evaluation.get("rootCause")

        if failure_type in {
            "FACTUAL_ERROR",
            "REASONING_ERROR",
            "INSTRUCTION_ERROR",
            "GENERATION_ERROR"
        }:
            return {
                "failureType": failure_type,
                "rootCause": root_cause
            }

        return {
            "failureType": "UNKNOWN_ERROR",
            "rootCause": (
                root_cause
                or "The evaluator detected a problem "
                   "but could not determine the specific cause."
            )
        }