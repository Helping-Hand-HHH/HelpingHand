import './Resources.css';
import NavBar from '../NavBar/NavBar.js'

function Resources() {
  const cards = [
    <div className='block'>
      <div className='f-card'>
        <div className="f-section">
        <a href>
            <h2>Emergency Telephone Number - 911</h2>
            <p>If you believe that you or someone you know is in danger or may be dangerous to others we encourage you to call for emergency help using the number provided.</p>
        </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='f-card'>
        <div className="f-section">
        <a href>
              <h2>Suicide & Crisis Telephone Number - 988</h2>
              <p>While we try our best, we cannot simulate an exact conversation with a human. If you wish to call or text a crisis counselor, use the phone number provided.</p>
        </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='f-card'>
        <div className="f-section">
          <a target='_blank' rel="noreferrer" href="https://www.nami.org/home">
            <h2>NAMI</h2>
            <p>NAMI, the National Alliance on Mental Illness, is the nation's largest mental health organization and had dedicated their purpose to trying to create a better life for Americans with mental illnesses. Their mission is to make people with mental illness to feel supported by a community.</p>
          </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='f-card'>
        <div className="f-section">
          <a target='_blank' rel="noreferrer" href="https://www.cdc.gov/mentalhealth/index.htm">
            <h2>CDC</h2>
            <p>The CDC, Center for Disease Control and Prevention, also has a mental health resources site. This site allows users to primarily become more educated about mental health issues and provides methods on how to take care of yours or another person's mental health.</p>
          </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='f-card'>
        <div className="f-section">
          <a target='_blank' rel="noreferrer" href="https://search.yahoo.com/local/s;_ylt=AwrO_03cNNFltwIL.WFXNyoA;_ylu=Y29sbwNncTEEcG9zAzEEdnRpZAMEc2VjA3Nj?type=E211US714G0&p=mental+health+clinics+near+me&fr=mcafee">
            <h2>Mental Health Clinics</h2>
            <p>Mental health clinics serve as vital resources in communities, offering support and treatment for individuals facing mental health challenges. These clinics are dedicated spaces where individuals can seek assistance for mental and emotional concerns in a supportive environment.</p>
          </a>
        </div>
      </div>
      </div>,
      <div className='block'>
      <div className='f-card'>
        <div className="f-section">
          <a target='_blank' rel="noreferrer" href="https://www.helpguide.org/articles/therapy-medication/support-groups.htm">
            <h2>Support Groups</h2>
            <p>Support groups serve as valuable platforms for mutual aid, empowerment, and healing, offering individuals a safe and confidential space to share their stories, find solace, and work toward personal growth and recovery in the company of others who truly understand.</p>
          </a>
        </div>
      </div>
      </div>,
    
    <div class="clearfix"></div>
  ];  
  return (
    <div>
      <NavBar currPage={'resources'}/>
      <p className="title">Resources</p>
      <section id="block" className="f-sections">
        {cards.map((item, index) => (
          <div key={index}>
          {item}
          </div>
        ))}
      </section>
      <footer className="footer" id="contact">
        <p>© 2024 HelpingHand. All rights reserved.</p>
      </footer>
    </div>
    
    
  );
}

export default Resources;
