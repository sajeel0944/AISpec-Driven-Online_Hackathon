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

GEMINI_API_KEY : str = os.getenv("GEMINI_API_KEY")
MODEL : str = "gemini-2.5-flash"

#----------------------------------------------------------------

external_client = AsyncOpenAI(
    api_key = GEMINI_API_KEY,
    base_url = "https://generativelanguage.googleapis.com/v1beta/openai/"
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
    You are a helpful book assistant. Your role is to answer user queries related to books.
    When relevant, use the 'retrieve_from_qdrant' tool to fetch information from the vector database,
    so you can provide accurate book-related information to the user.
    """
,
    model=model,
    tools=[search_qdrant],
    input_guardrails=[check_book_topic],
    model_settings=ModelSettings(tool_choice="required")
)  

# ------------------runner  ------------------ #

def main_assistant(messages: List[Dict]):
    try:
        res = Runner.run_sync(agent, input=messages)
        return res.final_output
    except InputGuardrailTripwireTriggered as e:
        return("My scope is limited to providing information and assistance on book-related topics only.")
    except Exception as e:
        return f"Sorry, I'm currently unavailable. Please try again in a few moments. {e}"
    
