import './Affirmations.css';
import NavBar from '../NavBar/NavBar.js'
import React, {useState, useEffect} from 'react'


function Affirmations() {
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteInput, setNoteInput] = useState('');
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        const storedNoteCards = localStorage.getItem('noteCards');
        if (storedNoteCards) {
            setNoteCards(JSON.parse(storedNoteCards));
        }
    }, []);

    const [noteCards, setNoteCards] = useState(() => {
        // Initialize noteCards from localStorage or default value
        const storedNoteCards = localStorage.getItem('noteCards');
        return storedNoteCards ? JSON.parse(storedNoteCards) : [
            // { index: 1, text: 'Item 1', x: 30, y: 30},
            // { index: 2, text: 'Item 2', x: 50, y: 50},
        ];
    });

    const clearStorage = () => {
        localStorage.removeItem('noteCards');
        console.log("clear being called");
        setNoteCards([]);
    }

    const addNoteCard = (noteText) => {
        const newNote = {
            index: noteCards.length + 1,
            text: noteText,
            x: 100,
            y: 100
        };
        setNoteCards(prevNoteCards => {
            const updatedNoteCards = [...prevNoteCards, newNote];
            // Save updated noteCards to localStorage
            localStorage.setItem('noteCards', JSON.stringify(updatedNoteCards));
            return updatedNoteCards;
        });
    };

    // State variables to track the position and dragging of the textbox
    const [position, setPosition] = useState({ x: 300, y: 300 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddNote();
        }
    };

    const handleAddNote = () => {
        // Perform actions needed when a note is added
        console.log('Note added:', noteInput);
        addNoteCard(noteInput);
        // Clear the input field
        setNoteInput('');
        // Close the popup
        setShowAddNote(false);
    };


    const handleMouseDown = (event, index) => {
        setIsDragging(true);
        const offsetX = event.clientX - noteCards[index - 1].x;
        const offsetY = event.clientY - noteCards[index - 1].y;
        setOffset({ x: offsetX, y: offsetY });
    };
    
    const handleMouseMove = (event, index) => {
        if (isDragging) {
            const updatedNoteCards = [...noteCards];
            updatedNoteCards[index - 1].x = event.clientX - offset.x;
            updatedNoteCards[index - 1].y = event.clientY - offset.y;
            setNoteCards(updatedNoteCards);
            // Save updated noteCards to localStorage
            localStorage.setItem('noteCards', JSON.stringify(updatedNoteCards));
        }
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = (index) => {
        const updatedNoteCards = noteCards.filter((item) => item.index !== index);
        // Re-indexing the remaining items
        const reIndexedNoteCards = updatedNoteCards.map((item, i) => ({
            ...item,
            index: i+1
        }));
        setNoteCards(reIndexedNoteCards);
        localStorage.setItem('noteCards', JSON.stringify(reIndexedNoteCards));
    };

    return (
        <div>
            <NavBar currPage={'affirmations'}/>
            <p className='title'>Affirmations</p>
            <div>
                <button className="addButton" onClick={() => setShowAddNote(true)}>+</button>
                <button className="clearButton" onClick={clearStorage}>Clear</button>
                {noteCards.length > 0 && noteCards.map(item => (
                 <div key={item.index}
                    className="draggable-textbox"
                    style={{ top: item.y, left: item.x }}
                    onMouseDown={(event) => handleMouseDown(event, item.index)}
                    onMouseMove={(event) => handleMouseMove(event, item.index)}
                    onMouseUp={handleMouseUp}
                    onDoubleClick={() => handleDoubleClick(item.index)}
                    >
                    {item.text}
                    </div>
                ))}
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
        
                
            </div>
            
        </div>
    );
}

export default Affirmations;