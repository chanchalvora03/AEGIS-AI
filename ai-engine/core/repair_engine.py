class RepairEngine:
    """
    Executes repairs using the specialist selected by AgentManager.
    """

    def __init__(self, agent_manager=None):
        self.agent_manager = agent_manager

    def repair(
        self,
        task: str,
        answer: str,
        failure_type: str
    ) -> dict:

        if self.agent_manager is None:
            return {
                "repairStrategy": "No AgentManager configured",
                "agentUsed": None,
                "repairedAnswer": answer
            }

        specialist = self.agent_manager.select_specialist(
            failure_type
        )

        if specialist is None:
            return {
                "repairStrategy": "No specialist available",
                "agentUsed": None,
                "repairedAnswer": answer
            }

        if failure_type == "FACTUAL_ERROR":
            repaired_answer = specialist.verify_and_repair(
                task,
                answer
            )

            return {
                "repairStrategy": "Add VerificationAgent",
                "agentUsed": "VerificationAgent",
                "repairedAnswer": repaired_answer
            }

        if failure_type == "REASONING_ERROR":
            repaired_answer = specialist.reason_and_repair(
                task,
                answer
            )

            return {
                "repairStrategy": "Add ReasoningAgent",
                "agentUsed": "ReasoningAgent",
                "repairedAnswer": repaired_answer
            }

        return {
            "repairStrategy": "No repair strategy available",
            "agentUsed": None,
            "repairedAnswer": answer
        }