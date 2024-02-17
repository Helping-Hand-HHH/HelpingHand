import './Affirmations.css';
import NavBar from '../NavBar/NavBar.js'
import React, {useState, useEffect} from 'react'


function Affirmations() {
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteInput, setNoteInput] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const storedNotes = localStorage.getItem('notes');
        console.log(storedNotes);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      }, []);
    
      const clearStorage = () => {
        localStorage.removeItem('notes');
        setNotes('');
      };
    
      const updateNotes = (newNote) => {
        setNotes(prevNotes => {
          const updatedNotes = [...prevNotes, newNote];
          localStorage.setItem('notes', JSON.stringify([...prevNotes, newNote]));
          return updatedNotes;
        });
      };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddNote();
        }
    };

    const handleAddNote = () => {
        // Perform actions needed when a note is added
        console.log('Note added:', noteInput);
        updateNotes(noteInput);
        // Clear the input field
        setNoteInput('');
        // Close the popup
        setShowAddNote(false);
    };

    
    return (
        <div>
            <NavBar currPage={'affirmations'}/>
            <p className='title'>Affirmations</p>
            <div className='boardContainer'>
                <button className="addButton" onClick={() => setShowAddNote(true)}>+</button>
                {showAddNote && (
                    <div className='popup'>
                        <div className='popup-inner'>
                            <p className='title'>New Affirmation</p>
                            <input 
                            className="notesInput" 
                            placeholder="Type and press Enter to submit"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            ></input>
                            <button onClick={() => setShowAddNote(false)}>Cancel</button>
                        </div>
                        
                    </div>
                )}

                {/* Display notes */}
                
            </div>
            
        </div>
    );
}

export default Affirmations;