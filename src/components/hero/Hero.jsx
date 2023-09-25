/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const Hero = ({ data }) => {
  return (
    <section className="hero">
      <div className="container">
        {data.category && (
          <div className="hero__inner">
            <div className="hero__inner-box">
              <p className="hero__category">{data.category.name || ""}</p>
              <h1 className="hero__title">{data.category.description.split(".")[0] || ""}</h1>
              <p className="hero__metadata">
                By {data.user ? <span className="hero__author">{`${data.user.first_name} ${data.user.last_name}`}</span> : ""} |
                {data.category.createdAt ? ` ${data.category.createdAt.split("T")[0]}` : ""}
              </p>
              <p className="hero__description">{data.category.description || ""}</p>
            </div>
            <div>
              <Link to={`/post/${data._id}`} className="hero__link hero__button">Read more</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}



export default Hero