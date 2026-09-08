from core.agent_manager import AgentManager


manager = AgentManager()


print("NORMAL TASK:")
print(manager.adapt(None))


print("\nFACTUAL ERROR:")
print(manager.adapt("FACTUAL_ERROR"))


print("\nREASONING ERROR:")
print(manager.adapt("REASONING_ERROR"))