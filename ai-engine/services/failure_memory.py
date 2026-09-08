from difflib import SequenceMatcher


class FailureMemory:
    """
    Stores previous AEGIS failures and their successful repairs.

    This MVP implementation keeps memory in RAM.
    It can later be replaced by a persistent backend.
    """

    def __init__(self, similarity_threshold=0.65):
        self.memories = []
        self.similarity_threshold = similarity_threshold

    def store(
        self,
        task: str,
        failure_type: str,
        root_cause: str,
        repair_strategy: str,
        repaired_answer: str
    ):
        """
        Store a successful failure-repair experience.
        """

        memory = {
            "task": task,
            "failureType": failure_type,
            "rootCause": root_cause,
            "repairStrategy": repair_strategy,
            "repairedAnswer": repaired_answer
        }

        self.memories.append(memory)

        return memory

    def search(
        self,
        task: str,
        failure_type: str = None
    ):
        """
        Find the most similar previous failure.
        """

        if not self.memories:
            return None

        best_memory = None
        best_score = 0.0

        for memory in self.memories:

            if (
                failure_type is not None
                and memory["failureType"] != failure_type
            ):
                continue

            score = SequenceMatcher(
                None,
                task.lower(),
                memory["task"].lower()
            ).ratio()

            if score > best_score:
                best_score = score
                best_memory = memory

        if best_score >= self.similarity_threshold:
            return {
                "memory": best_memory,
                "similarity": round(best_score, 3)
            }

        return None

    def all_memories(self):
        """
        Return all stored memories.
        """

        return self.memories.copy()

    def clear(self):
        """
        Clear all stored memories.
        """

        self.memories.clear()