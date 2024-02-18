from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai
from dotenv import load_dotenv
import os
from pydantic import BaseModel
# from langchain.text_splitter import CharacterTextSplitter
# from langchain.embeddings import OpenAIEmbeddings
# from langchain.vectorstores import FAISS
# from langchain.chat_models import ChatOpenAI
# from langchain.memory import ConversationBufferMemory
# from langchain.chains import ConversationalRetrievalChain

# class Lang:
#     conversation = None
#     chat_history = None
#     response = None
    
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

# def get_text_chunks(text):
#     text_splitter = CharacterTextSplitter(
#         separator="\n",
#         chunk_size=1000,
#         chunk_overlap=200,
#         length_function=len
#     )
#     chunks = text_splitter.split_text(text)
#     return chunks


# def get_vectorstore(text_chunks):
#     embeddings = OpenAIEmbeddings()
#     vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
#     return vectorstore


# def get_conversation_chain(vectorstore):
#     llm = ChatOpenAI()

#     memory = ConversationBufferMemory(
#         memory_key='chat_history', return_messages=True)
#     conversation_chain = ConversationalRetrievalChain.from_llm(
#         llm=llm,
#         retriever=vectorstore.as_retriever(),
#         memory=memory
#     )
#     return conversation_chain


# def handle_userinput(user_question):
#     Lang.response = Lang.conversation({'question': user_question})
#     Lang.chat_history = Lang.response['chat_history']


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
    # if not Lang.conversation:
    #     Lang.conversation = None
    # if not Lang.chat_history:
    #     Lang.chat_history = None
        
    # handle_userinput(raw_text)

    # text_chunks = get_text_chunks(raw_text)

    # vectorstore = get_vectorstore(text_chunks)

    # Lang.conversation = get_conversation_chain(vectorstore)
    
    try:
        # return {"message": generate_response(raw_text), "conversation": Lang.conversation, "chat_history": Lang.chat_history}
        return {"message": generate_response(raw_text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/audio")
async def return_text():
    try:
        # create function for generating LLM response on request with whisper
        # return the response generated
        return {"message": "Audio recording successfully sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
