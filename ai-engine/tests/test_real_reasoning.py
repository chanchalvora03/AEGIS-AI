from agents.reasoning_agent import ReasoningAgent


def main():
    print("Initializing Ollama ReasoningAgent...")

    agent = ReasoningAgent()

    print("Sending incorrect reasoning for repair...")

    result = agent.reason_and_repair(
        "If a shirt costs $20 and is discounted by 25%, "
        "what is the final price?",
        "The final price is $18 because 25% of $20 is $2."
    )

    print("\nReasoningAgent Result:")
    print(result)


if __name__ == "__main__":
    main()