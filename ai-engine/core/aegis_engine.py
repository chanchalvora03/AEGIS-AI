import uuid

from agents.generator import GeneratorAgent
from agents.evaluator import EvaluatorAgent
from core.failure_classifier import FailureClassifier
from core.repair_engine import RepairEngine
from core.agent_manager import AgentManager
from services.failure_memory import FailureMemory


class AEGISEngine:
    """
    Main orchestration engine for AEGIS.

    AEGIS follows the cycle:

        Generate
            ↓
        Evaluate
            ↓
        Detect Failure
            ↓
        Classify Failure
            ↓
        Check Failure Memory
            ↓
        Adapt Architecture
            ↓
        Select Specialist
            ↓
        Repair
            ↓
        Re-evaluate
            ↓
        Store Successful Repair
    """

    def __init__(
        self,
        generator=None,
        evaluator=None,
        classifier=None,
        repair_engine=None,
        agent_manager=None,
        memory=None
    ):
        self.generator = (
            generator or GeneratorAgent()
        )

        self.evaluator = (
            evaluator or EvaluatorAgent()
        )

        self.classifier = (
            classifier or FailureClassifier()
        )

        self.agent_manager = (
            agent_manager or AgentManager()
        )

        self.repair_engine = (
            repair_engine
            or RepairEngine(
                agent_manager=self.agent_manager
            )
        )

        self.memory = (
            memory or FailureMemory()
        )

    def process(self, task: str) -> dict:
        """
        Process a user task through the complete AEGIS cycle.
        """

        if not task or not task.strip():
            raise ValueError("Task cannot be empty")

        session_id = str(uuid.uuid4())

        # ==========================================
        # 1. GENERATE
        # ==========================================

        initial_answer = self.generator.generate(task)

        # ==========================================
        # 2. EVALUATE
        # ==========================================

        evaluation = self.evaluator.evaluate(
            task,
            initial_answer
        )

        # ==========================================
        # 3. NO FAILURE
        # ==========================================

        if not evaluation["failureDetected"]:

            return {
                "sessionId": session_id,
                "task": task,
                "initialAnswer": initial_answer,
                "failureDetected": False,
                "failureType": None,
                "rootCause": None,
                "memoryUsed": False,
                "architectureBefore": [
                    "Generator",
                    "Evaluator"
                ],
                "architectureAfter": [
                    "Generator",
                    "Evaluator"
                ],
                "repairStrategy": None,
                "agentUsed": None,
                "finalAnswer": initial_answer,
                "finalEvaluation": evaluation,
                "resolved": True
            }

        # ==========================================
        # 4. CLASSIFY FAILURE
        # ==========================================

        classification = self.classifier.classify(
            task,
            initial_answer,
            evaluation
        )

        failure_type = classification["failureType"]
        root_cause = classification["rootCause"]

        # ==========================================
        # 5. CHECK FAILURE MEMORY
        # ==========================================

        memory_result = self.memory.search(
            task,
            failure_type
        )

        memory_used = memory_result is not None

        # ==========================================
        # 6. ADAPT ARCHITECTURE
        # ==========================================

        architecture = self.agent_manager.adapt(
            failure_type
        )

        # ==========================================
        # 7. REPAIR
        # ==========================================

        repair = self.repair_engine.repair(
            task,
            initial_answer,
            failure_type
        )

        repaired_answer = repair["repairedAnswer"]

        # ==========================================
        # 8. RE-EVALUATE
        # ==========================================

        final_evaluation = self.evaluator.evaluate(
            task,
            repaired_answer
        )

        resolved = not final_evaluation["failureDetected"]

        # ==========================================
        # 9. STORE SUCCESSFUL REPAIR
        # ==========================================

        if resolved:
            self.memory.store(
                task=task,
                failure_type=failure_type,
                root_cause=root_cause,
                repair_strategy=repair["repairStrategy"],
                repaired_answer=repaired_answer
            )

        # ==========================================
        # 10. RETURN COMPLETE RESULT
        # ==========================================

        return {
            "sessionId": session_id,
            "task": task,
            "initialAnswer": initial_answer,
            "failureDetected": True,
            "failureType": failure_type,
            "rootCause": root_cause,
            "memoryUsed": memory_used,
            "memoryMatch": (
                memory_result
                if memory_used
                else None
            ),
            "repairStrategy": repair["repairStrategy"],
            "agentUsed": repair["agentUsed"],
            "architectureBefore": architecture["architectureBefore"],
            "architectureAfter": architecture["architectureAfter"],
            "finalAnswer": repaired_answer,
            "finalEvaluation": final_evaluation,
            "resolved": resolved
        }