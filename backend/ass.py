import os
from typing import Dict, List
from agents import InputGuardrailTripwireTriggered, ModelSettings, Runner, Agent, OpenAIChatCompletionsModel, AsyncOpenAI, set_tracing_disabled
from agents.run import RunConfig
from dotenv import load_dotenv
import os
from guardrails.input_guardrails import check_book_topic
from tools.read_data_to_qdrant import search_qdrant

#----------------------------------------------------------------

load_dotenv()
set_tracing_disabled(disabled=True)

# ----------------------------------------------------------------

GROQ_API_KEY : str = os.getenv("GROQ_API_KEY")
MODEL : str = "openai/gpt-oss-20b"
 
#----------------------------------------------------------------

external_client = AsyncOpenAI(
    api_key = GROQ_API_KEY,
    base_url = "https://api.groq.com/openai/v1"
)

model = OpenAIChatCompletionsModel(
    model = MODEL,
    openai_client = external_client 
)

config = RunConfig(
    model = model,
    model_provider = external_client ,
    tracing_disabled = True
)

# ------------------ Agent Setup ------------------ #

agent = Agent(
    name="Assistant",
    instructions="""
    ## 📚 Assistant Agent Instructions

    You are a **helpful Book Assistant**. Your primary role is to provide clear, accurate,
    and helpful answers to **book-related user questions**.

    ---

    ## 🛠 Available Tool

    You have access to a powerful tool:

    ### 🔍 `search_qdrant`
    - This tool retrieves **relevant book-related content** from the Qdrant vector database.
    - Use this tool when:
    - A user asks about a book concept, explanation, summary, topic, or reference
    - You determine that accurate answers require information from stored knowledge

    ---

    ## 🤖 Special Mandatory Rule (IMPORTANT)

    ⚠️ **If a user's question is related in any way to the following topics:**
    - Artificial Intelligence (AI)
    - Physical AI
    - Humanoid Robotics
    - Robotics + AI
    - Intelligent Systems
    - AI-driven machines

    👉 **You MUST (mandatory) use the `search_qdrant` tool**
    to retrieve relevant and accurate information from the database.

    ---

    ## ✅ Response Guidelines

    - First, determine whether the question is **book-related or AI/Robotics-related**
    - If yes → use the `search_qdrant` tool
    - Present the retrieved information in:
    - Simple language
    - A well-structured format
    - A clear, user-friendly explanation

    ---

    ## ❌ What Not To Do

    - Do not guess when relevant data is available in the database
    - Do not ignore the tool when the topic involves AI / Physical AI / Humanoid Robotics

    ---

    ## 🎯 Goal

    Your goal is to provide the user with answers that are:
    - Correct
    - Context-aware
    - Knowledge-backed

    Especially within the **books** and **AI/Robotics** domains.
    """,
    model=model,
    tools=[search_qdrant],
    input_guardrails=[check_book_topic],
)

# ------------------runner  ------------------ #

def main_assistant(messages: List[Dict]):
    try:
        res = Runner.run_sync(agent, input=messages)
        return res.final_output
    except InputGuardrailTripwireTriggered as e:
        return("My scope is limited to providing information and assistance on book-related topics only.")
    except Exception as e:
        return f"Sorry, I'm currently unavailable. Please try again in a few moments."
    