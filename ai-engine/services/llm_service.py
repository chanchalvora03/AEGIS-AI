import json
import os
import urllib.request

from dotenv import load_dotenv


load_dotenv()


class LLMService:
    """
    Local LLM service for AEGIS using Ollama.

    Ollama runs locally at http://localhost:11434.
    """

    def __init__(self):
        self.model = os.getenv("OLLAMA_MODEL", "gpt-oss:20b")
        self.base_url = "http://localhost:11434"

    def _request(self, payload: dict) -> dict:
        """
        Send a request to the local Ollama API.
        """

        url = f"{self.base_url}/api/generate"

        data = json.dumps(payload).encode("utf-8")

        request = urllib.request.Request(
            url,
            data=data,
            headers={
                "Content-Type": "application/json"
            },
            method="POST"
        )

        with urllib.request.urlopen(request, timeout=120) as response:
            response_data = response.read().decode("utf-8")

        return json.loads(response_data)

    def generate(self, prompt: str) -> str:
        """
        Generate a normal text response from the local LLM.
        """

        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0
            }
        }

        response = self._request(payload)

        return response.get("response", "").strip()

    def generate_json(self, prompt: str) -> dict:
        """
        Generate structured evaluator output from the local LLM.

        The LLM returns a simple tagged format which is
        parsed into a Python dictionary.
        """

        structured_prompt = f"""
{prompt}

IMPORTANT:
Return ONLY these three lines.
Do not use JSON.
Do not use Markdown.
Do not add explanations.

FAILURE_DETECTED=true or false
FAILURE_TYPE=FACTUAL_ERROR, REASONING_ERROR, INSTRUCTION_ERROR, GENERATION_ERROR, or NO_ERROR
ROOT_CAUSE=brief explanation, or null if there is no failure
"""

        payload = {
            "model": self.model,
            "prompt": structured_prompt,
            "stream": False,
            "options": {
                "temperature": 0
            }
        }

        response = self._request(payload)

        text = response.get("response", "").strip()

        if not text:
            raise ValueError(
                "Ollama returned an empty response."
            )

        lines = [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

        result = {}

        for line in lines:
            if line.startswith("FAILURE_DETECTED="):
                value = line.split("=", 1)[1].strip().lower()
                result["failureDetected"] = value == "true"

            elif line.startswith("FAILURE_TYPE="):
                result["failureType"] = line.split("=", 1)[1].strip()

            elif line.startswith("ROOT_CAUSE="):
                value = line.split("=", 1)[1].strip()
                result["rootCause"] = (
                    None if value.lower() == "null" else value
                )

        required_fields = [
            "failureDetected",
            "failureType",
            "rootCause"
        ]

        missing_fields = [
            field
            for field in required_fields
            if field not in result
        ]

        if missing_fields:
            raise ValueError(
                f"Ollama returned an invalid evaluator response: {text}"
            )

        return result