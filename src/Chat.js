import './Chat.css';
import React, { useState } from 'react'

function Chat() {
  const [response, setResponse] = useState('Awaiting Submission');
  
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
      <div className="select">
      </div>
      <TextSubmit setResponse={setResponse}/>
      <p className="response">{response}</p>
    </div>
  );
}

function TextSubmit({ setResponse }) {
  const [text, setText] = useState('');

  const getTextResponse = (text) => {
    fetch('http://localhost:3001/api/gpt/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data.message);
        setResponse(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = () => {
    getTextResponse(text);
    setResponse("Please wait, generating response");
  }

  return (
    <div>
      <div className="text">
        <textarea className="written" rows={10} cols={80} onChange={handleTextChange}></textarea>
      </div>
      <div className="submit">
        <input className="button" type='submit' onClick={handleSubmit}></input>
      </div>
    </div>
  );
}

export default Chat;
