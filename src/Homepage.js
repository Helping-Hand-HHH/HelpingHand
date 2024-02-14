import React from 'react';
import './HomePage.css'; 

function HomePage() {

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">HelpingHand</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero" id="home">
        <h1>Mental Health Support and Awareness</h1>
        <p>HelpingHand provides mental health support to those who need.</p>
        <a className="cta" href='#features'>Explore</a>
      </header>

      <section id="features" className="features-sections">
        <div className='feature-card'>
          <div className="feature-section" id="ai-chat">
            <a href="/chat">
              <h2>AI Chat</h2>
              <p>Engage in meaningful conversations with our highly trained AI assistant, available 24/7 to offer you support, guidance, and companionship. Whether you're seeking answers to complex questions, need assistance with daily tasks, or simply wish to share your thoughts, our AI chat feature is here to listen and respond with empathy and intelligence. Powered by cutting-edge technology, it's designed to understand and adapt to your personal needs, making every interaction as enriching as it is helpful.</p>
            </a>
          </div>
        </div>
        <div className='feature-card'>
          <div className="feature-section" id="mental-health-resources">
            <a href="/resources">
              <h2>Mental Health Resources</h2>
              <p>Discover a comprehensive collection of mental health resources, carefully curated to support those facing mental health challenges. Our repository includes a wide range of websites, contact numbers, and informative links, providing access to expert advice, support groups, and therapeutic services. Whether you're looking for immediate help, seeking to understand more about mental health conditions, or exploring ways to support a loved one, our resources offer valuable guidance and reassurance in your journey towards wellbeing.</p>
            </a>
          </div>
        </div>
        <div className='feature-card'>
          <div className="feature-section" id="donations-charity">
            <a href="/donate">
              <h2>Donations and Charity</h2>
              <p>Make a meaningful difference by contributing to esteemed organizations dedicated to advancing mental health awareness, education, and support. Your donations help fund vital services, including crisis intervention, ongoing research, and the development of educational programs aimed at destigmatizing mental health issues. By donating, you're not only supporting those in immediate need but also investing in a future where mental health is openly discussed, understood, and prioritized by communities worldwide. Join us in our mission to create a more compassionate and informed society.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> support@HelpingHand.com</p>
          <p><strong>Phone:</strong> (925) 356-1890</p>
          <p><strong>Address:</strong> 1 Shields Ave, Davis, CA 95616</p>
        </div>
      </section>


      <footer className="footer" id="contact">
        <p>© 2024 HelpingHand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
