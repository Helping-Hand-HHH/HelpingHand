import './Donate.css';
import NavBar from '../NavBar/NavBar.js'

function Donate() {
  return (
    <div>
      <NavBar currPage={'donate'}/>
      <p className="title">Donate</p>
    </div>
  );
}

export default Donate;
