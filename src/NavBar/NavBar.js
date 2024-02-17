import './NavBar.css'

function NavBar({ currPage }) {
    const links = [
      <a id="chat" href="/chat">Chat</a>,
      <a id="affirmations" href="/affirmations">Affirmations</a>,
      <a id="destress" href="/destress">Destress</a>,
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
        <a className="logo" href='/'>HelpingHand</a>
        <div className="nav-links">
          {nav}
        </div>
      </nav>
    );
}

export default NavBar;