import React from 'react';
import './HomePage.css'; 
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer';

function HomePage() {

  const cards = [
    <div className='feature-card'>
    <div className="feature-section" id="ai-chat">
      <a href="/chat">
        <h2>AI Chat</h2>
        <p>Chat with our AI assistant 24/7 for support, answers, and companionship, all tailored to your needs with empathy and intelligence.</p>
      </a>
    </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/affirmations">
          <h2>Affirmations</h2>
          <p>Boost your day with positive affirmations for confidence, self-love, and growth. Use these phrases for motivation and to foster peace and happiness.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/destress">
          <h2>Destress</h2>
          <p>Discover calm with our meditation and breathing techniques, designed for instant relaxation and mental wellbeing. Practice our easy-to-follow routines anytime, anywhere, for peace and renewal.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/mindfulness">
          <h2>Mindfulness</h2>
          <p>Enhance your life with mindfulness practices for the present moment. Our exercises promote awareness, gratitude, and joy, helping you observe thoughts and feelings non-judgmentally. Cultivate mindfulness to boost focus, lower stress, and improve relationships.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/resources">
          <h2>Mental Health Resources</h2>
          <p>Find a wide array of mental health resources, including expert advice, support groups, and therapy services. Our collection supports anyone seeking help, understanding, or ways to assist others, guiding you towards wellbeing.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="donations-charity">
        <a href="/donate">
          <h2>Donations and Charity</h2>
          <p>Support mental health progress by donating to respected organizations. Your contributions fund crucial services like crisis aid, research, and education to combat stigma. By giving, you aid those in need and invest in a future where mental health is prioritized. Help us foster a compassionate, informed society.</p>
        </a>
      </div>
    </div>,
  ];

  const itemVariants = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, transition: { duration: 0.5 } },
  };
  
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
        {cards.map((item, index) => (
          <InView key={index} triggerOnce={false} threshold={0.7}>
            {({ inView, ref }) => (
              <motion.div
                ref={ref}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {item}
              </motion.div>
            )}
          </InView>
        ))}
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