from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ass import main_assistant

app = FastAPI()

# ye midleware hai is main bata ky hamary api kis kis url par chayly ga
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ai-spec-driven-online-hackathon-e4rg-5p5bqdfyo.vercel.app"],
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.post("/ai_assistant")
def ai_assistant(prompt: list[dict]):
    try:
        res = main_assistant(prompt)
        return res
    except Exception as e:
        return "Sorry, I'm currently unavailable. Please try again in a few moments."
    