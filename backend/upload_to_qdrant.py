from uuid import uuid4
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

# ------------------- Create Collection if not exists ------------------ #

if not qdrant.collection_exists(COLLECTION_NAME):
    qdrant.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config={"size": 768, "distance": "Cosine"}
    )
    print("✓ New Qdrant collection created!")
else:
    print("✓ Collection already exists, old data safe!")

# ------------------- Function to get Embedding ------------------ #

def get_embedding(text):
    embedding = genai.embed_content(
        model="models/text-embedding-004",  # Gemini embedding model
        content=text
    )
    return embedding["embedding"]

# ------------------- Upload Embeddings to Qdrant ------------------ #

def upload_to_qdrant(text_list: list[str]):
    try:
        points = []

        for text in text_list:
            vector = get_embedding(text)
            points.append(
                rest.PointStruct(
                    id=str(uuid4()),  # Unique auto ID
                    vector=vector,
                    payload={"text": text}
                )
            )
        # Upload
        qdrant.upsert(collection_name=COLLECTION_NAME, points=points)

        print(f"✓ {len(text_list)} items uploaded to Qdrant!")
    except Exception as e:
        print("✗ Error uploading to Qdrant:", e)


