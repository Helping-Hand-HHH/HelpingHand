import './Resources.css';

function Resources() {
  return (
    <div>
      <nav className="navbar">
        <a className="logo" href='/'>HelpingHand</a>
        <div className="nav-links">
          <a href="/chat">Chat</a>
          <a href="/donate">Donations</a>
        </div>
      </nav>
      <p className="title">Resources</p>
    </div>
  );
}

export default Resources;
