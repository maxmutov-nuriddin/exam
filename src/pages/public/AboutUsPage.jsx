
import arm from '../../assets/about.png'
import person from '../../assets/aboutt3persons.png'

const AboutUsPage = () => {
  return (
    <>
      <section className="about">
        <div className="container">
          <div className="about__content">
            <div className="about__block">
              <p className="about__title">Our Mission</p>
              <h3 className="about__subtitle">Creating valuable content for creatives all around the world</h3>
              <p className="about__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.</p>
            </div>
            <div className="about__block">
              <p className="about__title">Our Mission</p>
              <h3 className="about__subtitle">Creating valuable content for creatives all around the world</h3>
              <p className="about__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="team">
        <div className="container">
          <div className="team__content">
            <div className="team__block">
              <h3 className="team__subtitle">Our team of creatives</h3>
              <p className="team__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <p className="team__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
            </div>
            <div className="team__block">
              <img src={arm} alt="6 arm" className="team__image" />
            </div>
          </div>
        </div>
      </section>
      <section className="team">
        <div className="container">
          <div className="team__contents">
            <div className="team__block">
              <h3 className="team__subtitle">Our team of creatives</h3>
              <p className="team__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <p className="team__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
            </div>
            <div className="team__block">
              <img src={person} alt="3 person" className="team__image" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUsPage