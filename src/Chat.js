import './Chat.css';
import React, { useState, useRef, useEffect } from 'react'
import { FaMicrophone } from "react-icons/fa";

function Chat() {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [response, setResponse] = useState('Waiting for Submission');

  useEffect(() => {
    const storedConvo = localStorage.getItem('convo');
    console.log(storedConvo);
    if (storedConvo) {
      setConversation(JSON.parse(storedConvo));
    }
  }, []);

  const clearStorage = () => {
    localStorage.removeItem('convo');
    setConversation('');
  };

  const updateConversation = (userText, botResponse) => {
    setConversation(prevConvo => {
      const updatedConvo = [...prevConvo, userText, botResponse];
      localStorage.setItem('convo', JSON.stringify([...prevConvo, userText, botResponse]));
      return updatedConvo;
    });
  };

  return (
    <div>
      <nav className="navbar">
        <a className="logo" href='/'>HelpingHand</a>
        <div className="nav-links">
          <a href="/resources">Resources</a>
          <a href="/donate">Donations</a>
        </div>
      </nav>
      <p className="title">HelpingHand AI Chat</p>
      <div className="select"></div>
      <Conversation conversation={conversation} />
      <TextSubmit text={text} setResponse={setResponse} setText={setText} updateConversation={updateConversation}/>
      <p className='response'>{response}</p>
      <div className='mic'>
        <AudioRecorder setResponse={setResponse}/>
      </div>
      <button className='clear' onClick={clearStorage}>Clear</button>
    </div>
  );
}

function Conversation({ conversation }) {

  return (
    <div>
      {conversation.length !== 0 && (<div className='conversation'>
        {conversation.map((convo, index) => (
          <div className='single-response' key={index}>{index % 2 === 0 ? <span><strong>You:</strong> {convo}</span> : <span><strong>HelpingHand:</strong> {convo}</span>}</div>
        ))}
      </div>)}
    </div>
  );
}

function TextSubmit({ setResponse, text, setText, updateConversation }) {

  const getTextResponse = (text) => {
    fetch("http://localhost:8000/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data.message);
      const copy = data.message;
      updateConversation(text, copy);
      setResponse('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const textareaRef = React.useRef(null); 
  
  const handleTextChange = (e) => {
    const textarea = textareaRef.current;
    setText(e.target.value);
  
    textarea.style.height = 'auto'; 
  
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleSubmit = () => {
    setResponse('Please wait, generating response');
    getTextResponse(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
    }
  };

  return (
    <div>
      <div className="text">
        <textarea
          ref={textareaRef}
          className="written"
          value={text}
          rows={1}
          onChange={handleTextChange}></textarea>
          <input className="button" type='submit' onClick={handleSubmit}></input>
      </div>
    </div>
  );
}

function AudioRecorder({ setResponse }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };
  
  const sendAudio = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
    audioChunks.current = [];
  
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
  
      const response = await fetch('http://localhost:8000/audio', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setRecording(true);
    } else {
      console.error("getUserMedia not supported on your browser!");
    }
  };

  const handleClick = () => {
    if(recording) {
      setResponse('Audio recording stopped, generating response');
      stopRecording();
      document.getElementById('fa').style.color = 'black';
      sendAudio();
    }
    else {
      setResponse('Capturing Audio');
      startRecording();
      document.getElementById('fa').style.color = 'red';
    }
  };

  return (
    <div id='fa'>
      <FaMicrophone onClick={handleClick} />
    </div>
  );
};

export default Chat;