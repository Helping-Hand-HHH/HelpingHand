import './NavBar.css'

function NavBar({ currPage }) {
    const links = [
      <a id="chat" href="/chat">Chat</a>,
      <a id="affirmations" href="/affirmations">Affirmations</a>,
      <a id="mindfulness" href="/mindfulness">Mindfulness</a>,
      <a id="resources" href="/resources">Resources</a>,
      <a id="donate" href="/donate">Donations</a>,
    ];
  
    const nav = links.filter(item => item.props.id !== currPage).map((item) => {
      return (
        <span key={item.props.id}>{item}</span>
      );
    });
  
    return (
      <nav className="navbar">
        <a href='/'>
          <img className='img' alt='HelpingHand' src='help.png' height={100} width={100}></img>
        </a>
        <div className="nav-links">
          {nav}
        </div>
      </nav>
    );
}

export default NavBar;