import './Mindfulness.css';
import NavBar from '../NavBar/NavBar.js'
import { useState } from 'react'

function Mindfulness() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [qa, setQA] = useState([]);

    window.addEventListener('load', function() {
      getQuestion();
    });

    const updateQA = (newQ, newA) => {
      const newQAPair = { question: newQ, response: newA };
      setQA(prevQaList => [...prevQaList, newQAPair]);
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
            <p>{item.question}: </p>
            <p>{item.response}</p>
          </div>
        )}
      </div>
    ));

    return (
        <div>
            <NavBar currPage={'mindfulness'}/>
            <p className='title'>Mindfulness</p>
            <p className='question'>{question}</p>
            <input 
              onKeyDown={handleSubmit}
              value={response}
              type="text" 
              onChange={e => setResponse(e.target.value)}
              placeholder="Press Enter to submit">
            </input>
            {items}
        </div>
    );
}

export default Mindfulness;