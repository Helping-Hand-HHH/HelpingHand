import './Chat.css';
import React, { useState } from 'react'

function Chat() {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [response, setResponse] = useState('Waiting for Submission');

  const updateConversation = (userText, botResponse) => {
    setConversation(prevConvo => [...prevConvo, { type: 'user', message: userText }, { type: 'bot', message: botResponse }]);
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
    </div>
  );
}

function Conversation({ conversation }) {
  return (
    <div className='conversation'>
      {conversation.map((convo, index) => (
        <div className='single-response' key={index}>{convo.type === 'user' ? `You: ${convo.message}` : `HelpingHand: ${convo.message}`}</div>
      ))}
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
      let response = data.message.replace(/^['"]|['"]$/g, '');
      let fin = response.substring(2);
      updateConversation(text, fin);
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
    <div className="text">
      <textarea
        ref={textareaRef}
        className="written"
        value={text}
        rows={1}
        onChange={handleTextChange}></textarea>
        <input className="button" type='submit' onClick={handleSubmit}></input>
    </div>
  );
}

export default Chat;