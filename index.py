from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai
from dotenv import load_dotenv
import os
from pydantic import BaseModel

class TextRequest(BaseModel):
    text: str

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_response(text):
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt="You help those struggling with mental illness by guiding them carefully and empathetically through tough situations. Here is what the user told you: \n\n" + text,
        max_tokens=1000
    )
    return response.choices[0].text

@app.post("/")
async def return_text(request: TextRequest):
    raw_text = request.text
    try:
        return {"message": generate_response(raw_text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
