
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <ul className="footer__address">
          <li className="footer__address-item"><Link className='footer__address-link'>Finstreet 118 2561 Fintown</Link></li>
          <li className="footer__address-item"><Link className='footer__address-link'>Hello@finsweet.com  020 7993 2905</Link></li>
        </ul>
        <ul className="footer__social">
          <li className="footer__social-item"><Link className='footer__social-link'><img src="../../../public/svg/facebook.svg" alt="facebook" /></Link></li>
          <li className="footer__social-item"><Link className='footer__social-link'><img src="../../../public/svg/twiter.svg" alt="twitter" /></Link></li>
          <li className="footer__social-item"><Link className='footer__social-link'><img src="../../../public/svg/instagram.svg" alt="instagram" /></Link></li>
          <li className="footer__social-item"><Link className='footer__social-link'><img src="../../../public/svg/in.svg" alt="in" /></Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer