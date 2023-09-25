import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Card = ({ data }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card__image">
          <img className="card__image-photo" src="../../../public/png/hero.png" alt="img" />
        </div>
        <div className="card__content">
          <p className="card__category">{data.category.name}</p>
          <Link to={`/post/${data._id}`}>
            <h1 className="card__title">{data.category.description}</h1>
          </Link>
          <p className="card__paragraph">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card