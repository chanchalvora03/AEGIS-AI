from agents.generator import GeneratorAgent


class FakeGeneratorLLM:

    def generate(self, prompt: str) -> str:
        return "Penicillin was discovered by Alexander Fleming in 1928."


def main():

    llm = FakeGeneratorLLM()

    generator = GeneratorAgent(llm)

    result = generator.generate(
        "Who discovered penicillin?"
    )

    print("GENERATOR TEST")
    print(result)


if __name__ == "__main__":
    main()