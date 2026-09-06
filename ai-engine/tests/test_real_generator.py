from agents.generator import GeneratorAgent


def main():
    print("Initializing Ollama Generator...")

    generator = GeneratorAgent()

    print("Sending task to Ollama...")

    result = generator.generate(
        "Explain how artificial intelligence can help reduce traffic congestion."
    )

    print("\nOllama Generated Answer:")
    print(result)


if __name__ == "__main__":
    main()