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
        <p>Engage in meaningful conversations with our highly trained AI assistant, available 24/7 to offer you support, guidance, and companionship. Whether you're seeking answers to complex questions, need assistance with daily tasks, or simply wish to share your thoughts, our AI chat feature is here to listen and respond with empathy and intelligence. Powered by cutting-edge technology, it's designed to understand and adapt to your personal needs, making every interaction as enriching as it is helpful.</p>
      </a>
    </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/affirmations">
          <h2>Affirmations</h2>
          <p>Empower your day with positive affirmations designed to boost your confidence, resilience, and inner strength. Our carefully crafted affirmations encourage self-love, positivity, and a growth mindset, guiding you towards a more fulfilling life. Each phrase is a stepping stone to embracing your true potential, overcoming obstacles, and cultivating a sense of peace and happiness. Write down or repeat these affirmations to yourself during moments of doubt or whenever you need a motivational lift. Let these powerful words inspire you to achieve your goals and embrace the beauty of your journey.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/destress">
          <h2>Destress</h2>
          <p>Find your oasis of calm with our destress techniques, featuring meditation and breathing exercises tailored to soothe your mind and body. In today’s fast-paced world, taking time to unwind and relieve stress is essential for maintaining mental health and overall wellbeing. Our guided routines are easy to follow and can be practiced anywhere, anytime, providing you with instant relaxation and a sense of renewal. Whether you're new to meditation or looking for effective breathing strategies, our resources are here to support your journey towards tranquility.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/mindfulness">
          <h2>Mindfulness</h2>
          <p>Embrace the present moment with mindfulness practices that enrich your daily life. Our mindfulness exercises encourage you to engage fully with the here and now, fostering awareness, gratitude, and joy in everyday activities. By answering thought-provoking questions, you'll learn to observe your thoughts and feelings without judgment, leading to a deeper understanding of yourself and the world around you. Cultivate a mindful attitude to improve focus, reduce stress, and enhance your relationships with others and with yourself.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="mental-health-resources">
        <a href="/resources">
          <h2>Mental Health Resources</h2>
          <p>Discover a comprehensive collection of mental health resources, carefully curated to support those facing mental health challenges. Our repository includes a wide range of websites, contact numbers, and informative links, providing access to expert advice, support groups, and therapeutic services. Whether you're looking for immediate help, seeking to understand more about mental health conditions, or exploring ways to support a loved one, our resources offer valuable guidance and reassurance in your journey towards wellbeing.</p>
        </a>
      </div>
    </div>,
    <div className='feature-card'>
      <div className="feature-section" id="donations-charity">
        <a href="/donate">
          <h2>Donations and Charity</h2>
          <p>Make a meaningful difference by contributing to esteemed organizations dedicated to advancing mental health awareness, education, and support. Your donations help fund vital services, including crisis intervention, ongoing research, and the development of educational programs aimed at destigmatizing mental health issues. By donating, you're not only supporting those in immediate need but also investing in a future where mental health is openly discussed, understood, and prioritized by communities worldwide. Join us in our mission to create a more compassionate and informed society.</p>
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