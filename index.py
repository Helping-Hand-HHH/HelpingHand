from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import openai
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from io import BytesIO
import shutil
from pathlib import Path
    
class TextRequest(BaseModel):
    text: str

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

def textToAudio(text):
    response = openai.Audio.speech.create(
        model="tts-1",
        voice="alloy",
        input=text
    )
    audio_buffer = BytesIO()
    response.stream_to_file(audio_buffer)
    audio_buffer.seek(0)  
    return audio_buffer.getvalue()  

@app.post("/")
async def return_text(request: TextRequest):
    raw_text = request.text
    
    try:
        return {"message": generate_response(raw_text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/audio")
async def upload_audio(audio: UploadFile = File(...)):
    converted_text = ''
    
    try:
        with open(audio.filename, 'rb') as file:
            transcription = openai.audio.transcriptions.create("whisper-1", file)
            converted_text = transcription['text']
        return {"message": converted_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
