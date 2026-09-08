def generate_response(task: str) -> str:
    """
    Temporary mock LLM used for local AEGIS development.
    Replace with the real LLM service later.
    """

    responses = {
        "factual": (
            "Penicillin was discovered by Alexander Fleming in 1928."
        ),
        "reasoning": (
            "The answer is 42 because the calculation follows "
            "the required logical steps."
        ),
    }

    task_lower = task.lower()

    if "penicillin" in task_lower:
        return responses["factual"]

    if "reason" in task_lower or "logic" in task_lower:
        return responses["reasoning"]

    return f"Generated response for: {task}"