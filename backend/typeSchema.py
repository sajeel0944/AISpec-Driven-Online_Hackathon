from pydantic import BaseModel

class SignupType(BaseModel):
    username: str
    email: str
    education: str
    password: str

class LoginType(BaseModel):
    usernameOrEmail: str
    password: str