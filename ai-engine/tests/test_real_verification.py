from agents.verification_agent import VerificationAgent


def main():
    print("Initializing Ollama VerificationAgent...")

    verifier = VerificationAgent()

    print("Sending incorrect answer for verification...")

    result = verifier.verify_and_repair(
        "Who discovered penicillin?",
        "Penicillin was discovered by Marie Curie."
    )

    print("\nVerificationAgent Result:")
    print(result)


if __name__ == "__main__":
    main()