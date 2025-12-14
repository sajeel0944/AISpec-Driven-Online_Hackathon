from typing import Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Auth.Auth import Login, SignUp
from ass import main_assistant
from typeSchema import LoginType, SignupType

app = FastAPI()

# ----------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ai-spec-driven-online-hackathon-e4r.vercel.app"],
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ----------------------------------------------------------------

@app.post("/sign-up")
def sign_up(user_data: SignupType):
    try:
        create = SignUp(user_data)
        return create.save_to_db()
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
# --------------------------------------------------------------

@app.post("/sign-in")
def sign_in(user_data: LoginType):
    try:
        login = Login(user_data)
        return login.authenticate()
    except Exception as e:
        return {"status": "error", "message": str(e)}

# ---------------------------------------------------------------

@app.post("/ai_assistant")
def ai_assistant(prompt: List[Dict]):
    try:
        res = main_assistant(prompt)
        return res
    except Exception as e:
        return "Sorry, I'm currently unavailable. Please try again in a few moments."
    
