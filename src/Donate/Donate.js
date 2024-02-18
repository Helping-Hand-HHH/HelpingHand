import './Donate.css';
import NavBar from '../NavBar/NavBar.js'

function Donate() {
  const cards = [
    <div className='block'>
      <div className='g-card'>
        <div className="g-section">
        <a target='_blank' href="https://www.mhanational.org/donate-now">
            <h2>Mental Health America</h2>
            <p>Mental Health America (MHA) stands as the foremost community-based organization dedicated to addressing the challenges of individuals affected by mental disorders while advocating for mental health as an integral component of holistic well-being. As a nonprofit entity, MHA champions the belief that mental health is fundamental to overall wellness, offering authoritative support, recovery initiatives, and advocacy efforts. </p>
        </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='g-card'>
        <div className="g-section">
        <a target='_blank' href="https://supporting.afsp.org/?_gl=1*frnbi4*_ga*MTM3MzEzMDcwMS4xNzA4MjIwMjMy*_ga_44VZZG2H84*MTcwODIyMDIzMS4xLjEuMTcwODIyMDg4My42MC4wLjA.">
              <h2>AFSP</h2>
              <p> The American Foundation for Suicide Prevention (AFSP) is a nonprofit committed to preventing suicide and offering support to those impacted by it, aiming to instill hope and save lives. With chapters nationwide, AFSP implements multifaceted strategies including education, research funding, support programs, and advocacy efforts to address mood disorders, promote suicide prevention, and provide resources for survivors and at-risk individuals.</p>
        </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='g-card'>
        <div className="g-section">
          <a target='_blank' href="https://childmind.org/?form=maindonate">
            <h2>Child Mind Institute</h2>
            <p> The Child Mind Institute, a national nonprofit, is dedicated to improving the lives of children and families facing challenges with mental health and learning disorders. It aims to overcome the barriers of awareness and stigma surrounding mental illness by prioritizing access to effective treatments, advancing brain development science for better diagnosis and care, and providing informative resources that empower families and communities to seek assistance.</p>
          </a>
        </div>
      </div>
    </div>,
    <div className='block'>
      <div className='g-card'>
        <div className="g-section">
          <a target='_blank' href="https://www.nami.org/Home?campaign=509521">
            <h2>NAMI</h2>
            <p>The National Alliance on Mental Illness (NAMI) is a prominent grassroots mental health organization committed to improving the lives of Americans impacted by mental illness. It has evolved into a leading advocate and provider of education, events, and resources across hundreds of state organizations, local affiliates, and with the help of dedicated volunteers, aiming to raise awareness and eliminate the enduring stigma associated with mental health through various channels.</p>
          </a>
        </div>
      </div>
    </div>,

    <div class="clearfix"></div>
  ];

  return (
    <div>
      <NavBar currPage={'donate'}/>
      <p className="title">Donate</p>
      <section id="block" className="g-sections">
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
  )
}


export default Donate;
