import { useEffect, useState } from "react";
import request from "../../server/Server";
import Hero from "../../components/hero/Hero";
import BlogPosts from "../../components/blogPost/BlogPosts";
import Category from "../../components/category/Category";

import 'swiper/css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await request.get('/post/lastone');
      const respons = await request.get('/category');
      const res = await request.get('/post/lastones');
      setCategory(respons.data)
      setData(response.data);
      setInfo(res.data);
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

  console.log(data);

  return (
    <>
      <Hero data={data} />
      <BlogPosts info={info} />
      <Category category={category}/>
    </>
  );
};

export default HomePage;