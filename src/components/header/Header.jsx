import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

import './Header.css'

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);


  const [burger, setBurger] = useState(false)
  const open = () => {
    if (burger == true) {
      setBurger(false)
    } else {
      setBurger(true)
    }
  }

  return (
    <header className="header">
      <div className="">
        <nav className="header__nav">
          {
            isAuthenticated ? (<NavLink to='/my-posts' className="header__link">My Posts</NavLink>) : (<NavLink to='/' className="header__logo">
              <img src="../../../public/svg/Logo.svg" alt="logo" />
            </NavLink>)
          }
          <ul className={`header__menu ${burger ? 'open' : 'close'}`}>
            <li className="header__menu-item">
              <NavLink to='/' className="header__menu-link">Home</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/posts' className="header__menu-link">Blog</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/about' className="header__menu-link">About Us</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to='/register' className="header__menu-link">Register</NavLink>
            </li>
            <li className="header__menu-item">
              <ul className="header__sub-menu">
                <li className="header__sub-menu-item">
                  {
                    isAuthenticated ? (<NavLink to='/account' className="header__sub-menu-link">Account</NavLink>) : (<NavLink to='/login' className="header__sub-menu-link">Login</NavLink>)
                  }
                </li>
              </ul>
            </li>
          </ul>
          <button className="burger__btn" onClick={open}><img className="burger__btn-img" src="../../../public/png/pngwing.com (2).png" alt="burger btn" /></button>
        </nav>
      </div>
    </header>
  )
}

export default Header