from agents.evaluator import EvaluatorAgent


def main():
    print("Initializing Ollama Evaluator...")

    evaluator = EvaluatorAgent()

    print("Sending evaluation request to Ollama...")

    result = evaluator.evaluate(
        "Who discovered penicillin?",
        "Penicillin was discovered by Marie Curie."
    )

    print("\nOllama Evaluation Result:")

    print(result)


if __name__ == "__main__":
    main()