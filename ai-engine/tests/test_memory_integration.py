from core.aegis_engine import AEGISEngine


class FakeGenerator:
    def __init__(self):
        self.calls = 0

    def generate(self, task):
        self.calls += 1

        # First request intentionally produces a faulty answer.
        return "Marie Curie discovered penicillin."


class FakeEvaluator:
    def evaluate(self, task, answer):
        if "Marie Curie" in answer:
            return {
                "failureDetected": True,
                "failureType": "FACTUAL_ERROR",
                "rootCause": "Incorrect attribution of discovery."
            }

        return {
            "failureDetected": False,
            "failureType": "NO_ERROR",
            "rootCause": None
        }


class FakeVerificationAgent:
    def verify_and_repair(self, task, answer):
        return "Penicillin was discovered by Alexander Fleming in 1928."


class FakeAgentManager:
    def __init__(self):
        self.verification_agent = FakeVerificationAgent()
        self.base_architecture = [
            "Generator",
            "Evaluator"
        ]

    def select_specialist(self, failure_type):
        if failure_type == "FACTUAL_ERROR":
            return self.verification_agent

        return None

    def get_architecture(self, failure_type=None):
        if failure_type == "FACTUAL_ERROR":
            return [
                "Generator",
                "VerificationAgent",
                "Evaluator"
            ]

        return self.base_architecture.copy()

    def adapt(self, failure_type):
        return {
            "architectureBefore": self.base_architecture.copy(),
            "architectureAfter": self.get_architecture(
                failure_type
            ),
            "adapted": True,
            "specialist": self.select_specialist(
                failure_type
            )
        }


class FakeRepairEngine:
    def __init__(self, agent_manager):
        self.agent_manager = agent_manager

    def repair(self, task, answer, failure_type):
        specialist = self.agent_manager.select_specialist(
            failure_type
        )

        repaired_answer = specialist.verify_and_repair(
            task,
            answer
        )

        return {
            "repairStrategy": "Add VerificationAgent",
            "agentUsed": "VerificationAgent",
            "repairedAnswer": repaired_answer
        }


class FakeClassifier:
    def classify(self, task, answer, evaluation):
        return {
            "failureType": "FACTUAL_ERROR",
            "rootCause": "Incorrect attribution of discovery."
        }


def main():

    print("\n========== MEMORY INTEGRATION TEST ==========\n")

    agent_manager = FakeAgentManager()

    engine = AEGISEngine(
        generator=FakeGenerator(),
        evaluator=FakeEvaluator(),
        classifier=FakeClassifier(),
        agent_manager=agent_manager,
        repair_engine=FakeRepairEngine(agent_manager)
    )

    # First request
    print("FIRST REQUEST")
    result1 = engine.process(
        "Who discovered penicillin?"
    )

    print("Memory used:", result1["memoryUsed"])
    print("Final answer:", result1["finalAnswer"])

    # Second similar request
    print("\nSECOND REQUEST")
    result2 = engine.process(
        "Who was responsible for discovering penicillin?"
    )

    print("Memory used:", result2["memoryUsed"])

    if result2["memoryUsed"]:
        print("Memory match found!")
        print(
            "Similarity:",
            result2["memoryMatch"]["similarity"]
        )

    print("\n========== ASSERTIONS ==========\n")

    assert result1["resolved"] is True
    assert result1["memoryUsed"] is False

    assert result2["resolved"] is True
    assert result2["memoryUsed"] is True

    print("✓ First repair stored in memory")
    print("✓ Similar second task retrieved memory")
    print("✓ Memory integration working")
    print("\nMEMORY INTEGRATION TEST PASSED")


if __name__ == "__main__":
    main()