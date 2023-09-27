import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../server/Server";
import Card from "../../components/card/Card";
import NameTop from "../../components/heroname/NameTop";

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const handleInput = (e) => {
    setSearch(e.target.value);
    fetchData(e.target.value);
  };

  const fetchData = async (search) => {
    try {
      const response = await request.get(`/post?search=${search}&category=${categoryId}`);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(search);
  }, [search]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const categoryName = data.length > 0 ? data[0].category.name : '';

  return (
    <section>
      <NameTop categoryName={categoryName} />
      <div className="container">
        <input className="search__input" onChange={handleInput} type="text" placeholder="Searching ..." />
      </div>
      {data.length === 0 ? (
        <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
      ) : (
        data.map((el, index) => <Card key={index} data={el} />)
      )}
    </section>
  )
}

export default CategoryPage;