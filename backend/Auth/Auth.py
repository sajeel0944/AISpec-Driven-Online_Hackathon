from dataclasses import dataclass
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from typeSchema import LoginType, SignupType

load_dotenv()

mongodp  = os.getenv("mongodp")

@dataclass
class SignUp:
    data: SignupType
    
    def save_to_db(self):
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AiDrivenDevelopmentHackathon"]
                collection = db["signup"]

                user_data = {
                    "username": self.data.username,
                    "email": self.data.email,
                    "education": self.data.education,
                    "password": self.data.password
                }

                added_user = collection.insert_one(user_data)

                if added_user.acknowledged:
                    send_data = {
                        "username": self.data.username,
                        "email": self.data.email,
                        "education": self.data.education,
                    }
                    return {"status": "success", "message": "User signed up successfully.", "data": send_data}
                else:
                    return {"status": "error", "message": "Failed to sign up user."}
                
        except Exception as e:
            return{"status": "error", "message": str(e)}
        
@dataclass
class Login:
    data: LoginType

    def authenticate(self):
        try:
            with MongoClient(mongodp, tls=True) as client:
                db = client["AiDrivenDevelopmentHackathon"]
                collection = db["signup"]

                user = collection.find_one({
                    "$or": [
                        {"email": self.data.usernameOrEmail},
                        {"username": self.data.usernameOrEmail}
                    ],
                    "password": self.data.password
                })

                if not user:
                    return {
                        "status": "error",
                        "message": "Invalid username/email or password."
                    }

                userData = {
                    "username": user.get("username"),
                    "email": user.get("email"),
                    "education": user.get("education"),
                }

                return {
                    "status": "success",
                    "message": "Login successful.",
                    "data": userData
                }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }
