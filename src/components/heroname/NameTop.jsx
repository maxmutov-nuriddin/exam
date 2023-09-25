/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const NameTop = ({ categoryName }) => {

  return (
    <section className="top">
      <h2 className="top__title">{categoryName ? categoryName : "Not Found Card"}</h2>
      <p className="top__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      <p className="top__links">
        <Link className="top__link" to="/blog">Blog</Link> |
        <span className="top__category"> {categoryName ? categoryName : "Not Found Card"}</span>
      </p>
    </section>
  )
}

export default NameTop