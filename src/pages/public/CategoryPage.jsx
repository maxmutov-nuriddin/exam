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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10



  const handleInput = (e) => {
    setSearch(e.target.value);
    fetchData(e.target.value);
  };

  const fetchData = async (search) => {
    try {
      const response = await request.get(`/post?search=${search}&category=${categoryId}&page=${currentPage}&limit=${pageTotal}`);
      setData(response.data.data);
      setItemsPerPage(response.data.pagination.total)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(search);
  }, [search]);

  const totalPages = Math.ceil(itemsPerPage / pageTotal);

  const total = data.filter((total) => {
    console.log(total);
    const fullName = `${total.title} ${total.description}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  })

  const categoryName = data.length > 0 ? data[0].category.name : '';

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <NameTop categoryName={categoryName} />
      <div className="container">
        <input className="search__input" onChange={handleInput} type="text" placeholder="Searching ..." />
      </div>
      {search === '' ? (
        data.length === 0 ? (
          <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
        ) : (
          data.map((el, index) => <Card key={index} data={el} />)
        )) : total.length === 0 ? (
          <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
        ) : (
        total.map((el, index) => <Card key={index} data={el} />)
      )}
      {
        totalPages > 1 && (
          <div className="category__pagination">
            <button
              className="category__pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="category__pagination-current">{currentPage}</span>
            <button
              className="category__pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )
      }
    </section>
  )
}

export default CategoryPage;