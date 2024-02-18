import './Mindfulness.css';
import NavBar from '../NavBar/NavBar.js'
import React, { useState } from 'react'

function Mindfulness() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [qa, setQA] = useState([]);

    window.addEventListener('load', function() {
      getQuestion();
      const storedQA = localStorage.getItem('qa');
      console.log(storedQA);
      if (storedQA) {
        setQA(JSON.parse(storedQA));
      }
    });

    const clearStorage = () => {
      localStorage.removeItem('qa');
      setQA([]);
    };

    const updateQA = (newQ, newA) => {
      const newQAPair = { question: newQ, response: newA };
      setQA(prevQaList => {
        localStorage.setItem('qa', JSON.stringify([...prevQaList, newQAPair]));
        return [...prevQaList, newQAPair];
      });
    };

    const handleSubmit = (event) => {
      if(event.key === 'Enter') {
        updateQA(question, response);
        setResponse('');
        setQuestion('');
        getQuestion();
      }
    };
      
    const getQuestion = () => {
        fetch("http://localhost:3001/api/gpt/question", {
          method: 'GET',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data.message);
          const question = data.message;
          setQuestion(question);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const items = qa.map((item, index) => (
      <div key={index}>
        {item.response && (
          <div className='qa'>
            <p className='q'>{item.question}: </p>
            <p className='a'>{item.response}</p>
          </div>
        )}
      </div>
    ));

    const textareaRef = React.useRef(null); 
  
    const handleTextChange = (e) => {
      const textarea = textareaRef.current;
      setResponse(e.target.value);
    
      textarea.style.height = 'auto'; 
    
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    return (
        <div>
            <NavBar currPage={'mindfulness'}/>
            <p className='title'>Mindfulness</p>
            <p className='question'>{question}</p>
            <div className='in'>
              <textarea 
                rows={1}
                cols={50}
                ref={textareaRef}
                className='input'
                onKeyDown={handleSubmit}
                value={response}
                type="text" 
                onChange={handleTextChange}
                placeholder="Press Enter to submit">
              </textarea>
            </div>
            <button className='clear' onClick={clearStorage}>Clear Questions</button>
            {items}
        </div>
    );
}

export default Mindfulness;