from services.llm_service import LLMService


def main():
    print("Initializing Gemini...")

    llm = LLMService()

    print("Sending request to Gemini...")

    response = llm.generate(
        "Reply with exactly: Gemini connection successful."
    )

    print("\nGemini response:")
    print(response)


if __name__ == "__main__":
    main()