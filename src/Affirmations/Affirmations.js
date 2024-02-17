import './Affirmations.css';
import NavBar from '../NavBar/NavBar.js'

function Affirmations() {
    return (
        <div>
            <NavBar currPage={'affirmations'}/>
            <p className='title'>Affirmations</p>
        </div>
    );
}

export default Affirmations;