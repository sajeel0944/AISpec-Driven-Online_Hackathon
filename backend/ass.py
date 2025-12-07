import asyncio
from dataclasses import dataclass
import os
from agents import   ModelSettings, Runner, Agent, OpenAIChatCompletionsModel, AsyncOpenAI, TContext, TResponseInputItem, Tool, function_tool, set_tracing_disabled, input_guardrail, RunContextWrapper, output_guardrail, RunHooks, AgentHooks
from agents.run import RunConfig
from openai import BaseModel
from dotenv import load_dotenv
import qdrant_client
from qdrant_client import QdrantClient
import os

#----------------------------------------------------------------
load_dotenv()
set_tracing_disabled(disabled=True)

#----------------------------------------------------------------

qdrant_client = QdrantClient(
    url="https://51dff0c4-387d-4113-9795-f33ac83151f0.us-east4-0.gcp.cloud.qdrant.io:6333",
    api_key=os.getenv("QDRANT_API_KEY")
)
# ----------------------------
GEMINI_API_KEY : str = os.getenv("GEMINI_API_KEY")
MODEL : str = "gemini-2.5-flash"
COLLECTION_NAME = "hackathonData"
VECTOR_DIM = 768
TOP_K = 5

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

async def get_query_vector(text: str) -> list[float]:
    """
    Generate embeddings for the query using async Gemini/OpenAI client
    """
    # await the coroutine
    resp = await external_client.embeddings.create(
        model="text-embedding-004",
        input=text
    )
    return resp.data[0].embedding

@function_tool
async def retrieve_from_qdrant(user_query: str) -> str:
    """
    Retrieve relevant text entries from the Qdrant vector database.

    This function generates an embedding vector for the user's query,
    performs a vector similarity search in the specified Qdrant collection,
    and returns the top matching text records joined with separators.

    Args:
        user_query (str): The query string provided by the user.

    Returns:
        str: A combined string of the retrieved text payloads,
             separated by line breaks.
    """
    vector = await get_query_vector(user_query)  # await here
    results = qdrant_client.query_points(
        collection_name=COLLECTION_NAME,
        query=vector,
        limit=TOP_K
    )

    texts = [p.payload.get("text", "") for p in results.points]
    return "\n---\n".join(texts)

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
    tools=[retrieve_from_qdrant],
    model_settings=ModelSettings(tool_choice="required")
)  

# ------------------runner  ------------------ #
def main_assistant(messages: list[dict]):
    try:
        res = Runner.run_sync(agent, input=messages)
        return res.final_output
    except Exception as e:
        return f"Sorry, I'm currently unavailable. Please try again in a few moments. {e}"


