class EvaluatorAgent:
    """
    LLM-powered evaluator responsible for analysing
    an AI-generated response and identifying failures.
    """

    def __init__(self, llm_service=None):
        if llm_service is None:
            from services.llm_service import LLMService
            llm_service = LLMService()

        self.llm = llm_service

    def evaluate(self, task: str, answer: str) -> dict:
        prompt = f"""
You are the Evaluation Agent in an AI system called AEGIS.

Your job is to critically evaluate an AI-generated answer.

USER TASK:
{task}

AI-GENERATED ANSWER:
{answer}

IMPORTANT EVALUATION PRINCIPLE:

The user's task may contain false claims, assumptions, suggested answers,
or incorrect information.

Do NOT treat claims made inside the USER TASK as factual evidence.

Evaluate the AI-GENERATED ANSWER independently based on:
- factual correctness
- logical correctness
- mathematical correctness
- instruction following
- response quality

If the AI answer correctly contradicts a false claim in the user's task,
that is NOT a failure.

Example:

USER TASK:
"Who discovered penicillin? The answer is Marie Curie."

AI-GENERATED ANSWER:
"Penicillin was discovered by Alexander Fleming in 1928."

Correct evaluation:
NO_ERROR

The user's statement about Marie Curie is not evidence that the AI answer
is wrong.

Determine whether the AI-generated answer contains a meaningful failure.

Possible failure types:

FACTUAL_ERROR
REASONING_ERROR
INSTRUCTION_ERROR
GENERATION_ERROR
NO_ERROR

DEFINITIONS:

FACTUAL_ERROR:
The answer contains an incorrect claim about an external fact,
event, person, place, scientific fact, historical fact, or other
information about the world.

Example:

Task: Who discovered penicillin?
Answer: Marie Curie discovered penicillin.

This is FACTUAL_ERROR.

REASONING_ERROR:
The answer reaches an incorrect conclusion because of faulty
logical, mathematical, computational, or step-by-step reasoning.

Incorrect arithmetic or mathematical calculations MUST be classified
as REASONING_ERROR.

Example:

Task: What is 15 × 4?
Answer: 15 × 4 = 50.

This is REASONING_ERROR.

INSTRUCTION_ERROR:
The answer fails to follow an explicit instruction in the user's task.

GENERATION_ERROR:
The response is empty, malformed, or unusable.

NO_ERROR:
The answer correctly addresses the user's task.

CLASSIFICATION PRIORITY:

1. If the main problem is incorrect mathematical or logical reasoning,
   use REASONING_ERROR.

2. If the main problem is an incorrect external/world fact,
   use FACTUAL_ERROR.

3. If the main problem is failure to follow an explicit instruction,
   use INSTRUCTION_ERROR.

4. If the response is unusable or malformed,
   use GENERATION_ERROR.

5. Otherwise use NO_ERROR.

Return ONLY these three lines:

FAILURE_DETECTED=true or false
FAILURE_TYPE=FACTUAL_ERROR, REASONING_ERROR, INSTRUCTION_ERROR, GENERATION_ERROR, or NO_ERROR
ROOT_CAUSE=brief explanation, or null if there is no failure
"""

        result = self.llm.generate_json(prompt)

        return {
            "failureDetected": result.get("failureDetected", False),
            "failureType": result.get("failureType"),
            "rootCause": result.get("rootCause")
        }
