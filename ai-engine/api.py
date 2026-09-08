import json
import sys

from core.aegis_engine import AEGISEngine


def main():
    try:
        input_data = json.loads(sys.stdin.read())
        task = input_data.get("task", "").strip()

        if not task:
            raise ValueError("Task is required")

        engine = AEGISEngine()
        result = engine.process(task)

        print(json.dumps(result))

    except Exception as error:
        print(json.dumps({
            "error": str(error)
        }))
        sys.exit(1)


if __name__ == "__main__":
    main()