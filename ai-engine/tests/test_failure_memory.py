from services.failure_memory import FailureMemory


def main():

    print("\n========== FAILURE MEMORY TEST ==========\n")

    memory = FailureMemory()

    memory.store(
        task="Who discovered penicillin?",
        failure_type="FACTUAL_ERROR",
        root_cause="Incorrect attribution of discovery.",
        repair_strategy="Add VerificationAgent",
        repaired_answer=(
            "Penicillin was discovered by Alexander Fleming in 1928."
        )
    )

    print("Stored memories:")
    print(memory.all_memories())

    result = memory.search(
        "Who was responsible for discovering penicillin?",
        "FACTUAL_ERROR"
    )

    print("\nMemory search result:")
    print(result)

    if result:
        print("\nMEMORY MATCH FOUND")
        print("Similarity:", result["similarity"])
        print("Previous repair:")
        print(result["memory"]["repairedAnswer"])
    else:
        print("\nNO MEMORY MATCH")


if __name__ == "__main__":
    main()