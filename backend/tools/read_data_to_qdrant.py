from uuid import uuid4
from agents import function_tool
from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest

load_dotenv()

# ------------------- Configuration ---------------------------------------------

QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
COLLECTION_NAME = "hackathonData"

# ------------------- Initialize Clients ------------------------------------------

genai.configure(api_key=GEMINI_API_KEY)

qdrant = QdrantClient(
    url = QDRANT_URL,   
    api_key = QDRANT_API_KEY        
)

# ------------------- Function to get Embedding ------------------ #

def get_embedding(text):
    try:
        embedding = genai.embed_content(
            model="models/text-embedding-004",  # Gemini embedding model
            content=text
        )
        return embedding["embedding"]
    except Exception as e:
        return "Error: " + str(e)

# ------------------- Search Qdrant ------------------ #

@function_tool
def search_qdrant(query: str, limit: int = 1):
    """
    Retrieve relevant text entries from the Qdrant vector database.

    This function generates an embedding vector for the user's query,
    performs a vector similarity search in the configured Qdrant collection,
    and returns the top matching text records.

    Args:
        query (str): The query string provided by the user.
        limit (int, optional): The maximum number of results to return.
            Defaults to 1.

    Returns:
        list[str]: A list of retrieved text payloads. If an error occurs,
            a string describing the error is returned instead.
    """
    try:
        query_vector = get_embedding(query)

        results = qdrant.query_points(
            collection_name=COLLECTION_NAME,
            query=query_vector,
            limit=limit
        )

        data = []

        for point in results.points:
            data.append(point.payload["text"])

        return data
    except Exception as e:
        return "Error: " + str(e)
    