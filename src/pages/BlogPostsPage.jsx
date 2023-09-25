/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import request from "../server/Server";

import imgs from './assets/blog.png'
const BlogPostsPage = () => {
  const { postId } = useParams()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    try {
      const response = await request.get(`/post/${postId}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <section className="blog">
      <div className="container">
        <div className="blog__image">
          <img className="blog__image-photo" src={imgs} alt="img" />
        </div>
        <div className="blog__content">
          <div>
            <div className="blog__author">
              <img src={imgs} alt="avatar" className="blog__avatar" />
              <div className="blog__author-contents">
                <h4 className="blog__author-name">{data.user.first_name} {data.user.last_name}</h4>
                <p className="blog__author-description">{data.createdAt.split('T')[0]}</p>
              </div>
            </div>
            <h2 className="blog__title">{data.category.description}</h2>
            <p className="blog__subtitle">
              Startup <strong>(#{data.category.name})</strong>
            </p>
            <p className="blog__paragraph">{data.description}</p>
            <p className="blog__paragraph">{data.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPostsPage