import { Link } from "react-router-dom";
import { ENDPOINT } from "../../constants";

/* eslint-disable react/prop-types */
const Card = ({ data, my, edit, deleteCategory }) => {
  console.log(data);
  return (
    <div className="container">
      <div className="card">
        <div className="card__image">
          <img className="card__image-photo" src={`${ENDPOINT}upload/${data.photo._id}.${data.photo.name.split(".")[1]}`} alt="img" />
        </div>
        <div className="card__content">
          <p className="card__category">{data.title}</p>
          <Link to={`/post/${data._id}`}>
            <h1 className="card__title">{data.description}</h1>
          </Link>
          <p className="card__paragraph">{data.description}</p>
          {
            my === true ? (<div>
              <button
                className="category__button category__button--edit"
                onClick={() => edit(data._id)}
              >
                Edit
              </button>
              <button
                className="category__button category__button--delete"
                onClick={() => deleteCategory(data._id)}
              >
                Delete
              </button>
            </div>) : ''
          }
        </div>
      </div>
    </div>
  )
}

export default Card